import { Config } from './common/_config';
import Utility from './common/_utility';
import State from './common/_state';
import Storage from './common/_storage';
import Timer from './common/_timer';
window.CONFIG = Config;
window.UT = Utility;
window.STATE = new State();
window.STORAGE = new Storage();
window.TIMER = new Timer();
UT.deepFreeze(CONFIG);

import Main from './top/_main';
import Modal from './common/_modal';
window.TOP = {};
TOP.main = new Main();
window.MODAL = new Modal();