import {Injectable} from "angular2/core";
import Config = config.Config;

@Injectable()
export class ConfigService{
  getConfig():Config {
    return {
      kanji: {
        dataUrl: 'https://vincent314.github.io/nihongo3.14/docs/kanji-lessons/data/kanjis.json'
      }
    }
  }
}

