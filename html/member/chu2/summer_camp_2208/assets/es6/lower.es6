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

import Main from './lower/_main';
import Up from './lower/_up';
import Modal from './common/_modal';
window.LOWER = {};
LOWER.main = new Main();
LOWER.up = new Up();
window.MODAL = new Modal();