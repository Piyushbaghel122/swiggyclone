"use client";

import i18n from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  return (
    <div className="flex items-center space-x-1 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 bg-gray-50 dark:bg-gray-800 hover:border-orange-500 transition-colors">
      <Globe size={16} className="text-gray-500 dark:text-gray-400" />
      <select
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        defaultValue={i18n.language || "en"}
        className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-200 outline-none cursor-pointer max-h-60 overflow-y-auto"
      >
        <option value="en" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">English (English)</option>
        <option value="hi" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">हिन्दी (Hindi)</option>
        <option value="fr" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Français (French)</option>
        <option value="es" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Español (Spanish)</option>
        <option value="de" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Deutsch (German)</option>
        <option value="ja" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">日本語 (Japanese)</option>
        <option value="ko" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">한국어 (Korean)</option>
        <option value="zh" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">中文 (Chinese)</option>
        <option value="ar" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">العربية (Arabic)</option>
        <option value="ru" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Русский (Russian)</option>
        <option value="pt" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Português (Portuguese)</option>
        <option value="it" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Italiano (Italian)</option>
        <option value="tr" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Türkçe (Turkish)</option>
        <option value="nl" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Nederlands (Dutch)</option>
        <option value="pl" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Polski (Polish)</option>
        <option value="sv" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Svenska (Swedish)</option>
        <option value="no" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Norsk (Norwegian)</option>
        <option value="da" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Dansk (Danish)</option>
        <option value="fi" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Suomi (Finnish)</option>
        <option value="el" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Ελληνικά (Greek)</option>
        <option value="he" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">עברית (Hebrew)</option>
        <option value="th" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">ไทย (Thai)</option>
        <option value="vi" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Tiếng Việt (Vietnamese)</option>
        <option value="id" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Bahasa Indonesia (Indonesian)</option>
        <option value="ms" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Bahasa Melayu (Malay)</option>
        <option value="bn" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">বাংলা (Bengali)</option>
        <option value="pa" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">ਪੰਜਾਬੀ (Punjabi)</option>
        <option value="ta" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">தமிழ் (Tamil)</option>
        <option value="te" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">తెలుగు (Telugu)</option>
        <option value="mr" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">मराठी (Marathi)</option>
        <option value="gu" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">ગુજરાતી (Gujarati)</option>
        <option value="kn" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">ಕನ್ನಡ (Kannada)</option>
        <option value="ml" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">മലയാളം (Malayalam)</option>
        <option value="or" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">ଓଡ଼ିଆ (Odia)</option>
        <option value="as" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">অসমীয়া (Assamese)</option>
        <option value="ur" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">اردو (Urdu)</option>
        <option value="ne" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">नेपाली (Nepali)</option>
        <option value="cs" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Čeština (Czech)</option>
        <option value="hu" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Magyar (Hungarian)</option>
        <option value="ro" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Română (Romanian)</option>
        <option value="bg" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Български (Bulgarian)</option>
        <option value="hr" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Hrvatski (Croatian)</option>
        <option value="sr" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Српски (Serbian)</option>
        <option value="sk" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Slovenčina (Slovak)</option>
        <option value="sl" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Slovenščina (Slovenian)</option>
        <option value="uk" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Українська (Ukrainian)</option>
        <option value="be" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Беларуская (Belarusian)</option>
        <option value="lt" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Lietuvių (Lithuanian)</option>
        <option value="lv" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Latviešu (Latvian)</option>
        <option value="et" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Eesti (Estonian)</option>
        <option value="ka" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">ქართული (Georgian)</option>
        <option value="hy" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Հայերեն (Armenian)</option>
        <option value="az" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Azərbaycan (Azerbaijani)</option>
        <option value="kk" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Қазақша (Kazakh)</option>
        <option value="uz" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Oʻzbekcha (Uzbek)</option>
        <option value="mn" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Монгол (Mongolian)</option>
        <option value="fa" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">فارسی (Persian)</option>
        <option value="ku" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Kurdî (Kurdish)</option>
        <option value="ps" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">پښتو (Pashto)</option>
        <option value="sd" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">سنڌي (Sindhi)</option>
        <option value="si" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">සිංහല (Sinhala)</option>
        <option value="my" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">မြန်မာ (Burmese)</option>
        <option value="km" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">ខ្មែร (Khmer)</option>
        <option value="lo" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">ลาว (Lao)</option>
        <option value="tl" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Tagalog / Filipino (Filipino)</option>
        <option value="sw" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Kiswahili (Swahili)</option>
        <option value="am" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">አማርኛ (Amharic)</option>
        <option value="yo" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Yorùbá (Yoruba)</option>
        <option value="ig" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Igbo (Igbo)</option>
        <option value="ha" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Hausa (Hausa)</option>
        <option value="zu" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">isiZulu (Zulu)</option>
        <option value="xh" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">isiXhosa (Xhosa)</option>
        <option value="af" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Afrikaans (Afrikaans)</option>
        <option value="sq" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Shqip (Albanian)</option>
        <option value="mk" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Македонски (Macedonian)</option>
        <option value="bs" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Bosanski (Bosnian)</option>
        <option value="is" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Íslenska (Icelandic)</option>
        <option value="ga" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Gaeilge (Irish)</option>
        <option value="cy" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Cymraeg (Welsh)</option>
        <option value="gd" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Gàidhlig (Scottish Gaelic)</option>
        <option value="eu" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Euskara (Basque)</option>
        <option value="ca" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Català (Catalan)</option>
        <option value="gl" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Galego (Galician)</option>
        <option value="mt" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Malti (Maltese)</option>
        <option value="lb" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Lëtzebuergesch (Luxembourgish)</option>
        <option value="fo" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Føroyskt (Faroese)</option>
        <option value="eo" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Esperanto (Esperanto)</option>
        <option value="la" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Latina (Latin)</option>
        <option value="jv" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Basa Jawa (Javanese)</option>
        <option value="su" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Basa Sunda (Sundanese)</option>
        <option value="mg" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Malagasy (Malagasy)</option>
        <option value="so" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Soomaali (Somali)</option>
        <option value="rw" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Kinyarwanda (Kinyarwanda)</option>
        <option value="ny" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Chichewa (Chichewa)</option>
        <option value="sn" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Shona (Shona)</option>
        <option value="st" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Sesotho (Sesotho)</option>
        <option value="tn" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Setswana (Tswana)</option>
        <option value="tg" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Тоҷикӣ (Tajik)</option>
        <option value="ky" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Кыргызча (Kyrgyz)</option>
        <option value="tk" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-1">Türkmençe (Turkmen)</option>
      </select>
    </div>
  );
}
