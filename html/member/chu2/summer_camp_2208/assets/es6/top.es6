import { Config } from './common/_config';
import Utility from './common/_utility';
import State from './common/_state';
import Timer from './common/_timer';
window.CONFIG = Config;
window.UT = Utility;
window.STATE = new State();
window.TIMER = new Timer();
UT.deepFreeze(CONFIG);

import Main from './top/_main';
import Confetti from './top/_confetti';
window.TOP = {};
TOP.main = new Main();
TOP.confetti = new Confetti();