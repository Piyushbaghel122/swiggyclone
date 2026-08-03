import i18n from "i18next";
import { initReactI18next } from "@/node_modules/react-i18next";

import en from "../locales/en.json";
import hi from "../locales/hi.json";
import fr from "../locales/fr.json";
import es from "../locales/es.json";
import de from "../locales/de.json";
import ja from "../locales/ja.json";
import ko from "../locales/ko.json";
import zh from "../locales/zh.json";
import ar from "../locales/ar.json";
import ru from "../locales/ru.json";
import pt from "../locales/pt.json";
import it from "../locales/it.json";
import tr from "../locales/tr.json";
import nl from "../locales/nl.json";
import pl from "../locales/pl.json";
import sv from "../locales/sv.json";
import no from "../locales/no.json";
import da from "../locales/da.json";
import fi from "../locales/fi.json";
import el from "../locales/el.json";
import he from "../locales/he.json";
import th from "../locales/th.json";
import vi from "../locales/vi.json";
import id from "../locales/id.json";
import ms from "../locales/ms.json";
import bn from "../locales/bn.json";
import pa from "../locales/pa.json";
import ta from "../locales/ta.json";
import te from "../locales/te.json";
import mr from "../locales/mr.json";
import gu from "../locales/gu.json";
import kn from "../locales/kn.json";
import ml from "../locales/ml.json";
import or from "../locales/or.json";
import as from "../locales/as.json";
import ur from "../locales/ur.json";
import ne from "../locales/ne.json";
import cs from "../locales/cs.json";
import hu from "../locales/hu.json";
import ro from "../locales/ro.json";
import bg from "../locales/bg.json";
import hr from "../locales/hr.json";
import sr from "../locales/sr.json";
import sk from "../locales/sk.json";
import sl from "../locales/sl.json";
import uk from "../locales/uk.json";
import be from "../locales/be.json";
import lt from "../locales/lt.json";
import lv from "../locales/lv.json";
import et from "../locales/et.json";
import ka from "../locales/ka.json";
import hy from "../locales/hy.json";
import az from "../locales/az.json";
import kk from "../locales/kk.json";
import uz from "../locales/uz.json";
import mn from "../locales/mn.json";
import fa from "../locales/fa.json";
import ku from "../locales/ku.json";
import ps from "../locales/ps.json";
import sd from "../locales/sd.json";
import si from "../locales/si.json";
import my from "../locales/my.json";
import km from "../locales/km.json";
import lo from "../locales/lo.json";
import tl from "../locales/tl.json";
import sw from "../locales/sw.json";
import am from "../locales/am.json";
import yo from "../locales/yo.json";
import ig from "../locales/ig.json";
import ha from "../locales/ha.json";
import zu from "../locales/zu.json";
import xh from "../locales/xh.json";
import af from "../locales/af.json";
import sq from "../locales/sq.json";
import mk from "../locales/mk.json";
import bs from "../locales/bs.json";
import is from "../locales/is.json";
import ga from "../locales/ga.json";
import cy from "../locales/cy.json";
import gd from "../locales/gd.json";
import eu from "../locales/eu.json";
import ca from "../locales/ca.json";
import gl from "../locales/gl.json";
import mt from "../locales/mt.json";
import lb from "../locales/lb.json";
import fo from "../locales/fo.json";
import eo from "../locales/eo.json";
import la from "../locales/la.json";
import jv from "../locales/jv.json";
import su from "../locales/su.json";
import mg from "../locales/mg.json";
import so from "../locales/so.json";
import rw from "../locales/rw.json";
import ny from "../locales/ny.json";
import sn from "../locales/sn.json";
import st from "../locales/st.json";
import tn from "../locales/tn.json";
import tg from "../locales/tg.json";
import ky from "../locales/ky.json";
import tk from "../locales/tk.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
      ja: { translation: ja },
      ko: { translation: ko },
      zh: { translation: zh },
      ar: { translation: ar },
      ru: { translation: ru },
      pt: { translation: pt },
      it: { translation: it },
      tr: { translation: tr },
      nl: { translation: nl },
      pl: { translation: pl },
      sv: { translation: sv },
      no: { translation: no },
      da: { translation: da },
      fi: { translation: fi },
      el: { translation: el },
      he: { translation: he },
      th: { translation: th },
      vi: { translation: vi },
      id: { translation: id },
      ms: { translation: ms },
      bn: { translation: bn },
      pa: { translation: pa },
      ta: { translation: ta },
      te: { translation: te },
      mr: { translation: mr },
      gu: { translation: gu },
      kn: { translation: kn },
      ml: { translation: ml },
      or: { translation: or },
      as: { translation: as },
      ur: { translation: ur },
      ne: { translation: ne },
      cs: { translation: cs },
      hu: { translation: hu },
      ro: { translation: ro },
      bg: { translation: bg },
      hr: { translation: hr },
      sr: { translation: sr },
      sk: { translation: sk },
      sl: { translation: sl },
      uk: { translation: uk },
      be: { translation: be },
      lt: { translation: lt },
      lv: { translation: lv },
      et: { translation: et },
      ka: { translation: ka },
      hy: { translation: hy },
      az: { translation: az },
      kk: { translation: kk },
      uz: { translation: uz },
      mn: { translation: mn },
      fa: { translation: fa },
      ku: { translation: ku },
      ps: { translation: ps },
      sd: { translation: sd },
      si: { translation: si },
      my: { translation: my },
      km: { translation: km },
      lo: { translation: lo },
      tl: { translation: tl },
      sw: { translation: sw },
      am: { translation: am },
      yo: { translation: yo },
      ig: { translation: ig },
      ha: { translation: ha },
      zu: { translation: zu },
      xh: { translation: xh },
      af: { translation: af },
      sq: { translation: sq },
      mk: { translation: mk },
      bs: { translation: bs },
      is: { translation: is },
      ga: { translation: ga },
      cy: { translation: cy },
      gd: { translation: gd },
      eu: { translation: eu },
      ca: { translation: ca },
      gl: { translation: gl },
      mt: { translation: mt },
      lb: { translation: lb },
      fo: { translation: fo },
      eo: { translation: eo },
      la: { translation: la },
      jv: { translation: jv },
      su: { translation: su },
      mg: { translation: mg },
      so: { translation: so },
      rw: { translation: rw },
      ny: { translation: ny },
      sn: { translation: sn },
      st: { translation: st },
      tn: { translation: tn },
      tg: { translation: tg },
      ky: { translation: ky },
      tk: { translation: tk },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
