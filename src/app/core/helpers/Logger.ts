import winston = require("winston");
import {Config} from "../../web/config/Config";

winston.level = Config.current.winston.level;

export const Logger = winston;