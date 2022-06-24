var BAEC;
(function (BAEC) {
    var ApiClient = (function () {
        function ApiClient(config) {
            this.requests = [];
            this.config = {};
            if (!config)
                config = {};
            this.config.url = ApiClient.getBaeDefaultUrl(config.url, config.d2Url);
            this.config.d2Url = ApiClient.getD2DefaultUrl(config.d2Url, config.url);
            this.config.apiVersion = config.apiVersion || ApiClient.DEFAULT_API_VERSION;
            this.config.callerId = config.callerId || ApiClient.DEFAULT_CALLER_ID;
        }
        ApiClient.getMemberInfo = function (param) {
            if (!param)
                param = {};
            this.getMemberInfos({
                config: param.config,
                complete: function (response) {
                    if (!param.complete)
                        return;
                    param.complete({
                        error: response.error,
                        data: response.data ? response.data[0] : undefined
                    });
                }
            });
        };
        ApiClient.setAkamaiToken = function (param) {
            var _this = this;
            var client = new ApiClient(param.config);
            client.addRequest("common.akamaiToken.get", {});
            client.callApi(function (data, dataType) {
                if (_this.hasError(data)) {
                    if (param.complete) {
                        param.complete({ error: ApiErrors.E002 });
                    }
                    return;
                }
                var cookie = data.result.tokenName + "=" + data.result.token + ";domain=benesse.ne.jp;path=/";
                document.cookie = cookie;
                if (param.complete) {
                    param.complete({});
                }
            }, function (jqXHR, textStatus, errorThrown) {
                Common.Log.write(jqXHR);
                Common.Log.write(textStatus);
                Common.Log.write(errorThrown);
                if (param.complete) {
                    param.complete({ error: ApiErrors.E001 });
                }
                return;
            }, false);
        };
        ApiClient.getAkamaiBaseUrl = function () {
            return ApiClient.isProductHost(window.location.hostname) ?
                "https://townak.benesse.ne.jp/rel/A" : "https://townak.benesse.ne.jp/test/A";
        };
        ApiClient.getAvatarNickname = function (param) {
            var _this = this;
            var memberId = ApiClient.getMemberIDFromCookie();
            this.getMemberInfos({
                complete: function (response) {
                    if (!param.complete) {
                        return;
                    }
                    if (response.error) {
                        param.complete({ error: response.error });
                        return;
                    }
                    var client = new ApiClient(param.config);
                    response.data.forEach(function (data) {
                        client.addRequest("profile.nickname.get", {
                            memberID: memberId,
                            line: data.line,
                        });
                        client.addRequest("profile.avatar.get", {
                            memberID: memberId,
                            line: data.line,
                            seminarCode: data.jukoKoza === "Q01" ? "2" : "1",
                        });
                        client.addRequest("profile.avatar.get", {
                            memberID: memberId,
                            line: data.line,
                            seminarCode: data.jukoKoza === "Q01" ? "1" : "2",
                        });
                    });
                    client.callApi(function (data, dataType) {
                        if (!param.complete)
                            return;
                        if (_this.hasError(data)) {
                            param.complete({ error: ApiErrors.E002 });
                            return;
                        }
                        var avatarNicknameResponseData = {
                            line: response.data[0].line,
                            gakunen: response.data[0].gakunen,
                            jukoKoza: response.data[0].jukoKoza,
                            nickname: data[0].result.nickname
                        };
                        for (var i = 0; i < data.length / 3; i++) {
                            var profileNicknameGetRes = data[0 + (i * 3)].result;
                            var profileAvatarGetRes1 = data[1 + (i * 3)].result;
                            var profileAvatarGetRes2 = data[2 + (i * 3)].result;
                            var _line = response.data[i].line;
                            var _gakunen = response.data[i].gakunen;
                            var _jukoKoza = response.data[i].jukoKoza;
                            var _nickname = profileNicknameGetRes.nickname;
                            var _avatarList = profileAvatarGetRes1.avatarList;
                            if (!_avatarList) {
                                _avatarList = profileAvatarGetRes2.avatarList;
                            }
                            if (_avatarList) {
                                for (var _i = 0, _avatarList_1 = _avatarList; _i < _avatarList_1.length; _i++) {
                                    var _avatar = _avatarList_1[_i];
                                    if (_avatar.settingFlag === "1") {
                                        avatarNicknameResponseData.line = _line;
                                        avatarNicknameResponseData.gakunen = _gakunen;
                                        avatarNicknameResponseData.jukoKoza = _jukoKoza;
                                        avatarNicknameResponseData.nickname = _nickname;
                                        avatarNicknameResponseData.avatar = _avatar;
                                        break;
                                    }
                                }
                            }
                            if (avatarNicknameResponseData.avatar) {
                                break;
                            }
                        }
                        param.complete({
                            data: avatarNicknameResponseData
                        });
                    }, function (jqXHR, textStatus, errorThrown) {
                        Common.Log.write(jqXHR);
                        Common.Log.write(textStatus);
                        Common.Log.write(errorThrown);
                        if (param.complete) {
                            param.complete({ error: ApiErrors.E001 });
                        }
                        return;
                    }, true);
                },
                config: param.config,
            });
        };
        ApiClient.getMemberInfos = function (param) {
            if (!param)
                param = {};
            var memberId = ApiClient.getMemberIDFromCookie();
            var client = new ApiClient(param.config || {});
            client.addRequest("common.bizDate.get", {});
            client.addRequest("profile.generalPurposeMemberInfo.get", { memberID: memberId, cacheFlag: "1" });
            client.callApi(function (data, dataType) {
                if (!param.complete) {
                    return;
                }
                if (ApiClient.hasError(data)) {
                    param.complete({ error: ApiErrors.E002 });
                    return;
                }
                var bizDate = data[0].result.bizDate;
                var currentYM = ApiClient.getCurrentYM(bizDate);
                var fy = Common.Util.getFY(currentYM);
                var generalPurposeMemberInfo = data[1].result;
                var memberInfos = GeneralPurposeMemberInfoUtil.getMemberInfo(generalPurposeMemberInfo, currentYM, fy);
                if (!memberInfos || memberInfos.length === 0) {
                    param.complete({ error: ApiErrors.E101 });
                    return;
                }
                param.complete({ data: memberInfos });
            }, function (jqXHR, textStatus, errorThrown) {
                Common.Log.write(jqXHR);
                Common.Log.write(textStatus);
                Common.Log.write(errorThrown);
                if (param.complete) {
                    param.complete({ error: ApiErrors.E001 });
                }
                return;
            }, false);
        };
        ApiClient.prototype.addRequest = function (method, params) {
            var request = {
                jsonrpc: "2.0",
                method: method,
                id: ApiClient.generateUUID(),
                params: params,
            };
            this.requests.push(request);
        };
        ApiClient.prototype.getRequests = function () {
            return this.requests;
        };
        ApiClient.prototype.callApi = function (success, error, useD2) {
            if (useD2 === void 0) { useD2 = false; }
            var param = this.requests.length > 1 ? this.requests : this.requests[0];
            var requestData = JSON.stringify(param);
            var url = useD2 ? this.config.d2Url : this.config.url;
            url = url + "?" + ApiClient.generateQuery(this.requests);
            $.ajax({
                contentType: "application/json",
                data: requestData,
                error: function (jqXHR, textStatus, errorThrown) {
                    if (error) {
                        error(jqXHR, textStatus, errorThrown);
                    }
                },
                headers: {
                    "X-Api-Version": this.config.apiVersion,
                    "X-Caller-Id": this.config.callerId,
                },
                success: function (data, dataType) {
                    if (success) {
                        success(data, dataType);
                    }
                },
                timeout: 30000,
                type: "POST",
                url: url,
                xhrFields: {
                    withCredentials: true,
                },
            });
        };
        ApiClient.getCurrentYM = function (bizDate) {
            var y = Number(bizDate.substr(0, 4));
            var m = Number(bizDate.substr(5, 2));
            var d = Number(bizDate.substr(8, 2));
            if (d >= 20) {
                m++;
            }
            var bd = new Date(y, m - 1, d);
            var year = bd.getFullYear();
            var month = bd.getMonth() + 1;
            return "" + year + ("0" + month).slice(-2);
        };
        ApiClient.getFY = function (ym) {
            return Common.Util.getFY(ym);
        };
        ApiClient.hasError = function (data) {
            var responses = [];
            if (!(data instanceof Array)) {
                responses.push(data);
            }
            else {
                responses = data;
            }
            for (var _i = 0, responses_1 = responses; _i < responses_1.length; _i++) {
                var response = responses_1[_i];
                if (response.error) {
                    return true;
                }
            }
            return false;
        };
        ApiClient.getMemberIDFromCookie = function () {
            var fnsssoHttpsCookie;
            if (location.protocol === "https") {
                fnsssoHttpsCookie = Common.Util.getCookie("fnssso_https_key");
            }
            else {
                fnsssoHttpsCookie = Common.Util.getCookie("fnssso_http_key");
            }
            if (!fnsssoHttpsCookie) {
                return "";
            }
            var memberInfo = Common.Util.base64Decode(fnsssoHttpsCookie);
            if (!memberInfo) {
                return "";
            }
            return memberInfo.split(":")[0];
        };
        ApiClient.generateQuery = function (requests) {
            if (!requests || requests.length === 0) {
                return "";
            }
            var methods = [];
            requests.forEach(function (element) {
                methods.push(element.method);
            });
            return "api=" + methods.join("-");
        };
        ApiClient.getBaeDefaultUrl = function (_baeUrl, _d2Url) {
            if (_baeUrl) {
                return _baeUrl;
            }
            if (_d2Url) {
                if (_d2Url === ApiClient.D2_URL_H) {
                    return ApiClient.BAE_API_URL_H;
                }
                else {
                    return ApiClient.BAE_API_URL_K;
                }
            }
            return ApiClient.isProductHost(window.location.hostname) ?
                ApiClient.BAE_API_URL_H : ApiClient.BAE_API_URL_K;
        };
        ApiClient.getD2DefaultUrl = function (_d2Url, _baeUrl) {
            if (_d2Url) {
                return _d2Url;
            }
            if (_baeUrl) {
                if (_baeUrl === ApiClient.BAE_API_URL_H) {
                    return ApiClient.D2_URL_H;
                }
                else {
                    return ApiClient.D2_URL_K;
                }
            }
            return ApiClient.isProductHost(window.location.hostname) ?
                ApiClient.D2_URL_H : ApiClient.D2_URL_K;
        };
        ApiClient.isProductHost = function (hostname) {
            for (var _i = 0, _a = ApiClient.DEV_HOSTS; _i < _a.length; _i++) {
                var devHost = _a[_i];
                if (hostname.indexOf(devHost) > 0) {
                    return false;
                }
            }
            return true;
        };
        ApiClient.generateUUID = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
        ApiClient.DEFAULT_API_VERSION = "1.0";
        ApiClient.DEFAULT_CALLER_ID = "ChuMemberSite";
        ApiClient.DEV_HOSTS = [
            "-ut.benesse.ne.jp",
            "-st.benesse.ne.jp",
            "-staging.benesse.ne.jp",
            "-t.benesse.ne.jp",
            "-t1.benesse.ne.jp",
            "-t4.benesse.ne.jp",
            "-test.benesse.ne.jp",
        ];
        ApiClient.BAE_API_URL_H = "https://bae.benesse.ne.jp/api";
        ApiClient.BAE_API_URL_K = "https://bae-ut.benesse.ne.jp/api";
        ApiClient.D2_URL_H = "https://d2.benesse.ne.jp/api";
        ApiClient.D2_URL_K = "https://d2-ut.benesse.ne.jp/api";
        return ApiClient;
    }());
    BAEC.ApiClient = ApiClient;
    var ApiErrors = (function () {
        function ApiErrors() {
        }
        ApiErrors.E001 = { name: "E001", message: "通信に失敗しました。" };
        ApiErrors.E002 = { name: "E002", message: "BAEまたは新中WEBのレスポンスにエラーがありました。" };
        ApiErrors.E101 = { name: "E101", message: "有効な契約データがありませんでした。" };
        ApiErrors.E900 = { name: "E900", message: "エラーが発生しました。" };
        return ApiErrors;
    }());
    BAEC.ApiErrors = ApiErrors;
    var GeneralPurposeMemberInfoUtil = (function () {
        function GeneralPurposeMemberInfoUtil() {
        }
        GeneralPurposeMemberInfoUtil.getMemberInfo = function (generalPurposeMemberInfo, currentYM, fy) {
            var _this = this;
            if (!generalPurposeMemberInfo || !generalPurposeMemberInfo.contract)
                return;
            var contracts = generalPurposeMemberInfo.contract;
            var lineContractDetails = {};
            if (!contracts)
                return;
            for (var _i = 0, contracts_1 = contracts; _i < contracts_1.length; _i++) {
                var contract = contracts_1[_i];
                if (contract.lineupCode !== "ZM")
                    continue;
                if (!contract.contractPayment)
                    continue;
                var _line = contract.productLineCode;
                var _contractDetails = [];
                for (var _a = 0, _b = contract.contractPayment; _a < _b.length; _a++) {
                    var contractPayment = _b[_a];
                    if (!contractPayment.contractDetail)
                        continue;
                    for (var _c = 0, _d = contractPayment.contractDetail; _c < _d.length; _c++) {
                        var contractDetail = _d[_c];
                        if (!contractDetail.contractProductDetail)
                            continue;
                        if (!contractDetail.contractProductDetail.contractDetailYm)
                            continue;
                        var contractDetailYm = contractDetail.contractProductDetail.contractDetailYm;
                        if (!this.isValidYM(_line, fy, contractDetailYm)) {
                            continue;
                        }
                        _contractDetails.push(contractDetail);
                    }
                }
                if (_contractDetails.length > 0) {
                    if (!lineContractDetails[_line]) {
                        lineContractDetails[_line] = [];
                    }
                    for (var _e = 0, _contractDetails_1 = _contractDetails; _e < _contractDetails_1.length; _e++) {
                        var contractDetail = _contractDetails_1[_e];
                        lineContractDetails[_line].push(contractDetail);
                    }
                }
            }
            if (Object.keys(lineContractDetails).length === 0) {
                return;
            }
            var contractInformations = [];
            for (var _line in lineContractDetails) {
                var _contractDetails = lineContractDetails[_line];
                var _gakunen = this.computeGakunen(fy, _line);
                var _contractInformationData = this.getContractDetailInformation(currentYM, _line, _gakunen, _contractDetails);
                if (!_contractInformationData)
                    continue;
                contractInformations.push(_contractInformationData);
            }
            if (contractInformations.length === 0)
                return null;
            contractInformations.sort(function (a, b) {
                return _this.compareContractInformationData(currentYM, a, b);
            });
            return contractInformations;
        };
        GeneralPurposeMemberInfoUtil.getContractDetailInformation = function (currentYM, line, gakunen, contractDetails) {
            var contractYM;
            var jukoKoza;
            var _contractDetails = contractDetails.sort(function (a, b) {
                return Number(b.contractProductDetail.contractDetailYm) - Number(a.contractProductDetail.contractDetailYm);
            });
            for (var _i = 0, _contractDetails_2 = _contractDetails; _i < _contractDetails_2.length; _i++) {
                var contractDetail = _contractDetails_2[_i];
                var _contractYM = contractDetail.contractProductDetail.contractDetailYm;
                var _jukoKoza = this.getJukoKoza(gakunen, contractDetail);
                if (!_contractYM || !_jukoKoza)
                    continue;
                if (this.compareYM(currentYM, contractYM, _contractYM) > 0) {
                    contractYM = _contractYM;
                    jukoKoza = _jukoKoza;
                }
            }
            return {
                contractDetailYm: contractYM,
                line: line,
                gakunen: gakunen,
                jukoKoza: jukoKoza
            };
        };
        GeneralPurposeMemberInfoUtil.compareYM = function (currentYM, a, b) {
            if (a === b) {
                return 0;
            }
            if (!a) {
                return 1;
            }
            if (!b) {
                return -1;
            }
            if (a === currentYM) {
                return -1;
            }
            if (b === currentYM) {
                return 1;
            }
            var currentFY = Common.Util.getFY(currentYM);
            var aFY = Common.Util.getFY(a);
            var bFY = Common.Util.getFY(b);
            if (aFY !== bFY) {
                if (aFY === currentFY) {
                    return -1;
                }
                if (bFY === currentFY) {
                    return 1;
                }
            }
            if (a > currentYM && b < currentYM) {
                return -1;
            }
            if (a < currentYM && b > currentYM) {
                return 1;
            }
            if (a > currentYM && b > currentYM) {
                if (a < b) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            if (a < currentYM && b < currentYM) {
                if (a > b) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return 0;
        };
        GeneralPurposeMemberInfoUtil.compareContractInformationData = function (currentYM, a, b) {
            if (!b)
                return -1;
            if (!a)
                return 1;
            var res = this.compareYM(currentYM, a.contractDetailYm, b.contractDetailYm);
            if (res !== 0) {
                return res;
            }
            if (a.line < b.line) {
                return -1;
            }
            else {
                return 1;
            }
        };
        GeneralPurposeMemberInfoUtil.isValidYM = function (line, fy, ym) {
            var nfy = parseInt(fy);
            var _fy = Common.Util.getFY(ym);
            var _nfy = parseInt(_fy);
            if (nfy - 3 > _nfy) {
                return false;
            }
            var _gakunen = this.computeGakunen(_fy, line);
            if (!_gakunen || (_gakunen.charAt(0) !== 'C' && _gakunen.charAt(0) !== 'S')) {
                return false;
            }
            return true;
        };
        GeneralPurposeMemberInfoUtil.getJukoKoza = function (gakunen, contractDetail) {
            if (!gakunen || !contractDetail)
                return;
            var gakunenType = gakunen.charAt(0);
            if (gakunenType === 'C' || gakunenType === 'S') {
                var textbookInformations = contractDetail.textbookInformation;
                if (!textbookInformations)
                    return;
                var textbookInformationCount = textbookInformations.length;
                for (var i = 0; i < textbookInformationCount; i++) {
                    var textbookInformation = textbookInformations[i];
                    if (!textbookInformation || !textbookInformation.decisionTypeCode)
                        continue;
                    var decisionTypeCode = textbookInformation.decisionTypeCode;
                    var decisionType = textbookInformation.textbookType;
                    if (decisionTypeCode.match(/_JUKO_KOZA$/)) {
                        return decisionType;
                    }
                    if (decisionTypeCode.match(/_JUKO_CHARENJI$/)) {
                        return decisionType;
                    }
                }
            }
            else {
                return "";
            }
            return;
        };
        GeneralPurposeMemberInfoUtil.computeGakunen = function (fy, line) {
            var n = Number(fy) - Number(line);
            switch (n) {
                case 18:
                    return "K3";
                case 17:
                    return "K2";
                case 16:
                    return "K1";
                case 15:
                    return "C3";
                case 14:
                    return "C2";
                case 13:
                    return "C1";
                case 12:
                    return "S6";
                case 11:
                    return "S5";
                case 10:
                    return "S4";
                case 9:
                    return "S3";
                case 8:
                    return "S2";
                case 7:
                    return "S1";
            }
            return;
        };
        return GeneralPurposeMemberInfoUtil;
    }());
    var Common;
    (function (Common) {
        var Util = (function () {
            function Util() {
            }
            Util.getFY = function (ym) {
                var year = Number(ym.substr(0, 4));
                if (Number(ym.slice(-2)) < 4) {
                    year--;
                }
                return String(year);
            };
            Util.getCookie = function (key) {
                if (!document.cookie) {
                    return;
                }
                var cookies = document.cookie.split(";");
                if (!cookies) {
                    return;
                }
                var cookie;
                cookies.forEach(function (value, index, array) {
                    var kv = value.trim().split("=");
                    if (kv && kv.length >= 2) {
                        if (kv[0] === key) {
                            cookie = kv[1];
                            return true;
                        }
                    }
                });
                return cookie;
            };
            Util.base64Decode = function (input) {
                var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = keyString.indexOf(input.charAt(i++));
                    enc2 = keyString.indexOf(input.charAt(i++));
                    enc3 = keyString.indexOf(input.charAt(i++));
                    enc4 = keyString.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 !== 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 !== 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = Util.uTF8Decode(output);
                return output;
            };
            Util.uTF8Decode = function (input) {
                var string = "";
                var i = 0;
                var c = 0;
                var c1 = 0;
                var c2 = 0;
                var c3 = 0;
                while (i < input.length) {
                    c = input.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    }
                    else if ((c > 191) && (c < 224)) {
                        c2 = input.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    }
                    else {
                        c2 = input.charCodeAt(i + 1);
                        c3 = input.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6)
                            | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            };
            return Util;
        }());
        Common.Util = Util;
        var Log = (function () {
            function Log() {
            }
            Log.write = function (message) {
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                if (console) {
                    console.log(message, optionalParams);
                }
            };
            return Log;
        }());
        Common.Log = Log;
    })(Common || (Common = {}));
})(BAEC || (BAEC = {}));
//# sourceMappingURL=BaeClient.js.map