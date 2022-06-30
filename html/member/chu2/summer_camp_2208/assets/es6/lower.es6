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
import Header from './lower/_header';
import Counter from './lower/_counter';
import Up from './lower/_up';
import Modal from './common/_modal';
import Trump from './lower/_trump';
window.LOWER = {};
LOWER.main = new Main();
LOWER.header = new Header();
LOWER.counter = new Counter();
LOWER.up = new Up();
LOWER.trump = new Trump();
window.MODAL = new Modal();