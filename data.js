/* PM TECH Water Solutions — Site Survey Data Model
   Each section has: id, title{ar,en}, groups[]
   Each group (optional subgroup) has: label{ar,en}, accentClass, fields[], showIf{field,value}
   Each field has: id, label{ar,en}, hint{ar,en},
     type: 'text' | 'select' | 'textarea' | 'date' | 'tel' | 'gps' | 'photos' | 'video' | 'signature' | 'stamp',
     cols, options (for select) [{id,ar,en}], reRenderSection (bool, triggers section re-render on change)
*/
const UI_TEXT = {
  hero_title: { ar: "استمارة المعاينة الفنية وجمع البيانات", en: "Site Survey & Technical Data Sheet" },
  hero_desc: {
    ar: "استمارة رقمية لتوثيق بيانات معاينة أنظمة رفع المياه بالطاقة الشمسية / الشبكة / الديزل. تُحفظ بياناتك تلقائيًا في هذا المتصفح.",
    en: "A digital form for documenting site survey data for solar / grid / diesel water pumping systems. Your entries are saved automatically in this browser."
  },
  pill_autosave: { ar: "حفظ تلقائي محلي", en: "Local autosave" },
  lang_toggle: { ar: "English", en: "العربية" },
  print_btn: { ar: "طباعة / PDF", en: "Print / PDF" },
  save_btn: { ar: "حفظ", en: "Save" },
  footer_brand: { ar: "PM TECH Water Solutions — وثيقة معاينة سرية", en: "PM TECH Water Solutions — Confidential Survey Document" },
  footer_note: {
    ar: "هذه الاستمارة أداة ميدانية داخلية. تأكد من مراجعة البيانات مع المهندس المسؤول قبل الاعتماد النهائي.",
    en: "This form is an internal field tool. Please confirm all entries with the responsible engineer before final sign-off."
  },
  toast_saved: { ar: "تم حفظ البيانات في هذا المتصفح ✓", en: "Data saved in this browser ✓" },
  toast_cleared: { ar: "تم مسح كل البيانات", en: "All data cleared" },
  clear_btn: { ar: "مسح الكل", en: "Clear all" },
  section_count_of: { ar: "مكتمل", en: "filled" },
  yes: { ar: "نعم", en: "Yes" },
  no: { ar: "لا", en: "No" },

  /* Dashboard */
  dash_title: { ar: "معايناتنا", en: "Our Surveys" },
  dash_desc: {
    ar: "كل معاينات المواقع المحفوظة في هذا الجهاز. افتح معاينة موجودة أو ابدأ معاينة جديدة.",
    en: "All site surveys saved on this device. Open an existing survey or start a new one."
  },
  new_survey: { ar: "+ معاينة جديدة", en: "+ New Survey" },
  import_json: { ar: "استيراد ملف", en: "Import File" },
  export_json: { ar: "تصدير", en: "Export" },
  duplicate_btn: { ar: "نسخ", en: "Duplicate" },
  delete_btn: { ar: "حذف", en: "Delete" },
  open_btn: { ar: "فتح", en: "Open" },
  empty_title: { ar: "لا توجد معاينات بعد", en: "No surveys yet" },
  empty_desc: { ar: "ابدأ أول معاينة موقع بالضغط على الزرار تحت", en: "Start your first site survey using the button below" },
  untitled_survey: { ar: "معاينة بدون اسم", en: "Untitled Survey" },
  back_to_list: { ar: "العودة لقائمة المعاينات", en: "Back to survey list" },
  confirm_delete: { ar: "هل أنت متأكد من حذف هذه المعاينة؟ لا يمكن التراجع.", en: "Delete this survey? This cannot be undone." },
  toast_deleted: { ar: "تم حذف المعاينة", en: "Survey deleted" },
  toast_duplicated: { ar: "تم نسخ المعاينة", en: "Survey duplicated" },
  toast_imported: { ar: "تم استيراد المعاينة بنجاح ✓", en: "Survey imported successfully ✓" },
  toast_import_error: { ar: "ملف غير صالح، تأكد أنه ملف تصدير صحيح", en: "Invalid file — please check it's a valid export file" },
  last_updated: { ar: "آخر تعديل", en: "Last updated" },
  added_by: { ar: "بواسطة", en: "By" },

  /* GPS map */
  map_title: { ar: "تحديد الموقع على الخريطة", en: "Select Location on Map" },
  use_my_location: { ar: "استخدام موقعي الحالي", en: "Use My Current Location" },
  map_cancel: { ar: "إلغاء", en: "Cancel" },
  map_confirm: { ar: "تأكيد الموقع", en: "Confirm Location" },
  pick_on_map: { ar: "الخريطة", en: "Map" },
  share_location: { ar: "مشاركة", en: "Share" },
  locating: { ar: "جاري تحديد موقعك...", en: "Locating you..." },
  location_error: { ar: "تعذر الوصول للموقع. تأكد من تفعيل صلاحية الموقع.", en: "Couldn't access location. Please allow location permission." },
  share_no_location: { ar: "من فضلك حدد الموقع الأول قبل المشاركة", en: "Please set a location first before sharing" },

  /* Photos & video */
  photos_label: { ar: "صور الموقع", en: "Site Photos" },
  photos_hint: { ar: "أضف صور للبئر، اللوحة، أو أي عنصر يفيد التوثيق (بيتم ضغطها تلقائيًا)", en: "Add photos of the well, panel, or anything useful for documentation (auto-compressed)" },
  add_photo: { ar: "إضافة صورة", en: "Add Photo" },
  video_label: { ar: "فيديو الموقع", en: "Site Video" },
  video_hint: { ar: "أضف فيديو قصير للموقع أو البئر أو اللوحة (اختياري)", en: "Add a short video of the site, well, or panel (optional)" },
  add_video: { ar: "إضافة فيديو", en: "Add Video" },
  uploading: { ar: "جاري المعالجة...", en: "Processing..." },
  upload_error: { ar: "فشلت العملية، حاول مرة أخرى", en: "Operation failed, please try again" },
  storage_full: { ar: "مساحة التخزين المحلي في المتصفح امتلأت. احذف بعض الصور/الفيديوهات القديمة أو صدّر المعاينة كنسخة احتياطية.", en: "Local browser storage is full. Delete some old photos/videos or export this survey as a backup." },

  /* Login screen */
  lock_title: { ar: "PM TECH Water Solutions", en: "PM TECH Water Solutions" },
  lock_desc: { ar: "هذا المحتوى خاص بفريق العمل. من فضلك أدخل كلمة المرور للمتابعة.", en: "This content is for team use only. Please enter the password to continue." },
  lock_btn: { ar: "دخول", en: "Unlock" },
  lock_hint: { ar: "محمي بكلمة مرور محلية لهذا المتصفح", en: "Protected by a local browser password" },
  lock_wrong: { ar: "كلمة المرور غير صحيحة، حاول مرة أخرى", en: "Incorrect password, please try again" },

  /* Panel components checklist */
  present_opt: { ar: "موجود", en: "Present" },
  absent_opt: { ar: "غير موجود", en: "Not Present" },

  /* Recommendations */
  recommendations_label: { ar: "التوصيات", en: "Recommendations" },
  recommendations_hint: { ar: "اكتب توصياتك للعميل بناءً على المعاينة", en: "Write your recommendations for the client based on the survey" },

  /* Signature & stamp */
  signature_clear: { ar: "مسح التوقيع", en: "Clear Signature" },
  signature_hint: { ar: "وقّع هنا بإصبعك أو الماوس", en: "Sign here with your finger or mouse" },
  signature_saved: { ar: "تم حفظ التوقيع ✓", en: "Signature saved ✓" },
  stamp_caption: { ar: "معتمد رسميًا من PM TECH Water Solutions", en: "Officially certified by PM TECH Water Solutions" },

  /* Power source selector */
  choose_power_source: { ar: "اختر مصدر الكهرباء المستخدم في هذا الموقع", en: "Choose the power source used at this site" },
};

const YN_OPTIONS = [
  { id: "yes", ar: "نعم", en: "Yes" },
  { id: "no", ar: "لا", en: "No" },
];

const PRESENT_OPTIONS = [
  { id: "present", ar: "موجود", en: "Present" },
  { id: "absent", ar: "غير موجود", en: "Not Present" },
];

const DRILLING_OPTIONS = [
  { id: "percussion", ar: "بوركيشن", en: "Percussion" },
  { id: "eason", ar: "إيسون", en: "Eason" },
  { id: "auger", ar: "بريمة", en: "Auger" },
];

const WELL_STATUS_OPTIONS = [
  { id: "new_developed", ar: "بئر حديث (تمت عملية التنمية والتطهير)", en: "New well (development & disinfection completed)" },
  { id: "new_undeveloped", ar: "بئر حديث (لم تتم عملية التنمية بعد)", en: "New well (development not performed yet)" },
  { id: "old_sustained", ar: "بئر قديم (مستدام وعامل)", en: "Old well (sustained and operating)" },
];

const POWER_SOURCE_OPTIONS = [
  { id: "solar", ar: "الطاقة الشمسية (Solar PV)", en: "Solar PV" },
  { id: "diesel", ar: "المولد (الديزل)", en: "Diesel Generator" },
  { id: "grid", ar: "محول الشبكة الكهربائية", en: "Grid Transformer" },
];

function sectionNotesField(id, labelAr, labelEn) {
  return { id, label: { ar: labelAr, en: labelEn }, type: "textarea" };
}

const SECTIONS = [
  /* =========================================================
     1. General & Logistic Information
  ========================================================= */
  {
    id: "s1",
    title: { ar: "بيانات عامة ولوجستية", en: "General & Logistic Information" },
    groups: [{
      fields: [
        { id: "engineerName", label: { ar: "اسم المهندس", en: "Engineer Name" }, type: "text" },
        { id: "clientName", label: { ar: "اسم العميل", en: "Client Name" }, type: "text" },
        { id: "surveyDate", label: { ar: "تاريخ المعاينة", en: "Survey Date" }, type: "date" },
        { id: "visitTime", label: { ar: "وقت الزيارة", en: "Site Visit Time" }, type: "text" },
        { id: "governorate", label: { ar: "المحافظة / المدينة", en: "Governorate / City" }, type: "text" },
        { id: "village", label: { ar: "القرية / المنطقة", en: "Village / Area" }, type: "text" },
        { id: "address", label: { ar: "العنوان التفصيلي", en: "Detailed Address" },
          hint: { ar: "علامات مميزة، طريق الوصول", en: "Landmarks, road access" }, type: "text", cols: "full" },
        { id: "gps", label: { ar: "إحداثيات GPS", en: "GPS Coordinates" },
          hint: { ar: "خط العرض، خط الطول — يمكنك مشاركتها لاحقًا على واتساب أو أي منصة", en: "Latitude, Longitude — you can share this later via WhatsApp or any app" }, type: "gps" },
        { id: "phone", label: { ar: "رقم هاتف التواصل (العميل / الموقع)", en: "Contact Phone (Client/Site)" }, type: "tel" },
        { id: "projectRef", label: { ar: "الرقم المرجعي للمشروع", en: "Project Reference No." }, type: "text" },
        sectionNotesField("generalNotes", "ملاحظات خاصة بالبيانات العامة", "General Information Notes"),
      ]
    }]
  },

  /* =========================================================
     2. Well Hydraulic Data
  ========================================================= */
  {
    id: "s2",
    title: { ar: "بيانات البئر الهيدروليكية", en: "Well Hydraulic Data" },
    groups: [
      {
        cols3: true,
        fields: [
          { id: "wellDiameter", label: { ar: "قطر البئر", en: "Well Diameter" }, hint: { ar: "بوصة", en: "inches" }, type: "text" },
          { id: "casingPipeDiameter", label: { ar: "قطر ماسورة غلاف البئر (Casing)", en: "Casing Pipe Diameter" }, hint: { ar: "بوصة", en: "inches" }, type: "text" },
          { id: "risingMainDiameter", label: { ar: "قطر ماسورة الرفع", en: "Rising Main (Column Pipe) Diameter" }, hint: { ar: "بوصة", en: "inches" }, type: "text" },
          { id: "casingMaterial", label: { ar: "مادة الغلاف", en: "Casing Material" }, hint: { ar: "صلب / PVC", en: "steel / PVC" }, type: "text" },
          { id: "totalDepth", label: { ar: "العمق الإجمالي للبئر", en: "Total Well Depth" }, hint: { ar: "متر", en: "meters" }, type: "text" },
          { id: "staticLevel", label: { ar: "منسوب المياه الساكن", en: "Static Water Level" }, hint: { ar: "متر من سطح الأرض", en: "meters, from ground" }, type: "text" },
          { id: "dynamicLevel", label: { ar: "منسوب المياه المتحرك المتوقع", en: "Expected Dynamic Water Level" }, hint: { ar: "متر من سطح الأرض", en: "meters, from ground" }, type: "text" },
          { id: "drillingMethod", label: { ar: "طريقة الحفر", en: "Drilling Method" }, type: "select", options: DRILLING_OPTIONS },
          { id: "filterDepth", label: { ar: "عمق الفلتر", en: "Filter Depth" }, hint: { ar: "متر", en: "meters" }, type: "text" },
          { id: "pumpTestReport", label: { ar: "هل يوجد تقرير اختبار ضخ؟", en: "Test Pumping Report Available?" }, type: "select", options: YN_OPTIONS },
          { id: "safeYield", label: { ar: "معدل التصرف الأمن", en: "Safe Yield Rate" }, hint: { ar: "م3/ساعة", en: "m3/hr" }, type: "text" },
          { id: "wellYield", label: { ar: "إنتاجية البئر (من اختبار الضخ)", en: "Well Yield (from test pumping)" }, hint: { ar: "م3/ساعة", en: "m3/hr" }, type: "text" },
          { id: "waterQuality", label: { ar: "جودة المياه", en: "Water Quality" }, hint: { ar: "مشاهدة بصرية / TDS إن وجد", en: "visual/TDS if known" }, type: "text" },
          { id: "wellStatus", label: { ar: "ما هي الحالة التشغيلية الحالية للبئر؟", en: "What is the well's current operational status?" }, type: "select", options: WELL_STATUS_OPTIONS, cols: "full" },
        ]
      },
      {
        cols1: true,
        fields: [
          sectionNotesField("wellNotes", "ملاحظات خاصة بالبئر", "Well-specific Notes"),
        ]
      }
    ]
  },

  /* =========================================================
     3. Pump Data (with water data)
  ========================================================= */
  {
    id: "s3",
    title: { ar: "بيانات الطلمبة", en: "Pump Data" },
    groups: [
      {
        cols3: true,
        fields: [
          { id: "pumpBrand", label: { ar: "ماركة الطلمبة", en: "Pump Brand" }, type: "text" },
          { id: "pumpModel", label: { ar: "الموديل", en: "Model" }, type: "text" },
          { id: "pumpSerial", label: { ar: "السيريال نمبر", en: "Serial Number" }, type: "text" },
          { id: "pumpPower", label: { ar: "القدرة", en: "Power" }, hint: { ar: "حصان / كيلوواط", en: "HP / kW" }, type: "text" },
          { id: "pumpStages", label: { ar: "عدد المراحل", en: "Number of Stages" }, type: "text" },
          { id: "pumpOuterDiameter", label: { ar: "القطر الخارجي", en: "Outer Diameter" }, hint: { ar: "بوصة", en: "inches" }, type: "text" },
          { id: "pumpDischargeDiameter", label: { ar: "قطر الطرد", en: "Discharge Diameter" }, hint: { ar: "بوصة", en: "inches" }, type: "text" },
          { id: "waterQuantity", label: { ar: "كمية المياه", en: "Water Quantity / Flow Rate" }, hint: { ar: "م3/ساعة", en: "m3/hr" }, type: "text" },
          { id: "pumpInstallDate", label: { ar: "تاريخ التركيب", en: "Installation Date" }, type: "date" },
          { id: "pumpOperatingHours", label: { ar: "وقت التشغيل", en: "Operating Hours" }, hint: { ar: "ساعة", en: "hours" }, type: "text" },
        ]
      },
      {
        cols1: true,
        fields: [ sectionNotesField("pumpNotes", "ملاحظات خاصة بالطلمبة", "Pump-specific Notes") ]
      }
    ]
  },

  /* =========================================================
     4. Motor Data (with electrical data)
  ========================================================= */
  {
    id: "s4",
    title: { ar: "بيانات الموتور", en: "Motor Data" },
    groups: [
      {
        cols3: true,
        fields: [
          { id: "motorBrand", label: { ar: "ماركة الموتور", en: "Motor Brand" }, type: "text" },
          { id: "motorModel", label: { ar: "الموديل", en: "Model" }, type: "text" },
          { id: "motorSerial", label: { ar: "السيريال نمبر", en: "Serial Number" }, type: "text" },
          { id: "motorPower", label: { ar: "القدرة", en: "Power" }, hint: { ar: "حصان / كيلوواط", en: "HP / kW" }, type: "text" },
          { id: "motorVoltage", label: { ar: "الفولت", en: "Voltage" }, hint: { ar: "فولت", en: "V" }, type: "text" },
          { id: "motorAmp", label: { ar: "الامبير", en: "Amperage" }, hint: { ar: "أمبير", en: "A" }, type: "text" },
          { id: "motorSpeed", label: { ar: "السرعة", en: "Speed" }, hint: { ar: "لفة/دقيقة RPM", en: "RPM" }, type: "text" },
          { id: "motorOuterDiameter", label: { ar: "القطر الخارجي", en: "Outer Diameter" }, hint: { ar: "بوصة", en: "inches" }, type: "text" },
        ]
      },
      {
        label: { ar: "قياس العزل (مقاومة العزل)", en: "Insulation Resistance Measurement" }, accentClass: "subgroup-grid", cols3: true,
        fields: [
          { id: "insulationL1", label: { ar: "L1", en: "L1" }, hint: { ar: "مقاومة العزل، MΩ", en: "insulation resistance, MΩ" }, type: "text" },
          { id: "insulationL2", label: { ar: "L2", en: "L2" }, hint: { ar: "مقاومة العزل، MΩ", en: "insulation resistance, MΩ" }, type: "text" },
          { id: "insulationL3", label: { ar: "L3", en: "L3" }, hint: { ar: "مقاومة العزل، MΩ", en: "insulation resistance, MΩ" }, type: "text" },
        ]
      },
      {
        label: { ar: "قياس الفولت (بين الأطوار)", en: "Voltage Measurement (Line-to-Line)" }, accentClass: "subgroup-solar", cols3: true,
        fields: [
          { id: "voltL1L2", label: { ar: "L1-2", en: "L1-2" }, hint: { ar: "فولت", en: "V" }, type: "text" },
          { id: "voltL2L3", label: { ar: "L2-3", en: "L2-3" }, hint: { ar: "فولت", en: "V" }, type: "text" },
          { id: "voltL1L3", label: { ar: "L1-3", en: "L1-3" }, hint: { ar: "فولت", en: "V" }, type: "text" },
        ]
      },
      {
        label: { ar: "قياس الأمبير (لكل طور)", en: "Current Measurement (Per Phase)" }, accentClass: "subgroup-diesel", cols3: true,
        fields: [
          { id: "ampL1", label: { ar: "L1", en: "L1" }, hint: { ar: "أمبير", en: "A" }, type: "text" },
          { id: "ampL2", label: { ar: "L2", en: "L2" }, hint: { ar: "أمبير", en: "A" }, type: "text" },
          { id: "ampL3", label: { ar: "L3", en: "L3" }, hint: { ar: "أمبير", en: "A" }, type: "text" },
        ]
      },
      {
        cols1: true,
        fields: [ sectionNotesField("motorNotes", "ملاحظات خاصة بالموتور", "Motor-specific Notes") ]
      }
    ]
  },

  /* =========================================================
     5. Power Source (conditional on selection)
  ========================================================= */
  {
    id: "s5",
    title: { ar: "مصدر الكهرباء", en: "Power Source" },
    groups: [
      {
        fields: [
          { id: "powerSourceType", label: { ar: "اختر مصدر الكهرباء المستخدم في هذا الموقع", en: "Choose the power source used at this site" },
            type: "select", options: POWER_SOURCE_OPTIONS, cols: "full", reRenderSection: true },
        ]
      },
      {
        label: { ar: "الطاقة الشمسية (Solar PV)", en: "Solar (PV) Option" }, accentClass: "subgroup-solar", cols3: true,
        showIf: { field: "powerSourceType", value: "solar" },
        fields: [
          { id: "panelCount", label: { ar: "إجمالي عدد الألواح", en: "Total Number of Panels" }, type: "text" },
          { id: "panelPower", label: { ar: "قدرة اللوح الواحد", en: "Panel Power" }, hint: { ar: "واط ذروة Wp", en: "Wp" }, type: "text" },
          { id: "panelVoc", label: { ar: "جهد الدائرة المفتوحة للوح (Voc)", en: "Panel Open-Circuit Voltage (Voc)" }, hint: { ar: "فولت", en: "V" }, type: "text" },
          { id: "panelVmp", label: { ar: "جهد أقصى قدرة للوح (Vmp)", en: "Panel Max-Power Voltage (Vmp)" }, hint: { ar: "فولت", en: "V" }, type: "text" },
          { id: "panelIsc", label: { ar: "تيار الدائرة المغلقة للوح (Isc)", en: "Panel Short-Circuit Current (Isc)" }, hint: { ar: "أمبير", en: "A" }, type: "text" },
          { id: "panelImp", label: { ar: "تيار أقصى قدرة للوح (Imp)", en: "Panel Max-Power Current (Imp)" }, hint: { ar: "أمبير", en: "A" }, type: "text" },
          { id: "panelBrand", label: { ar: "ماركة / موديل اللوح", en: "Panel Brand / Model" }, type: "text" },
          { id: "arrayPower", label: { ar: "إجمالي قدرة المصفوفة", en: "Total PV Array Power" }, hint: { ar: "كيلوواط ذروة kWp", en: "kWp" }, type: "text" },
          { id: "stringConfig", label: { ar: "طريقة توصيل السلاسل (Strings)", en: "String Configuration" }, hint: { ar: "مثال: 2 سلسلة × 12 لوح", en: "e.g. 2 strings x 12 panels" }, type: "text" },
          { id: "tiltAngle", label: { ar: "زاوية الميل والتوجيه", en: "Panel Orientation / Tilt Angle" }, hint: { ar: "درجة", en: "degrees" }, type: "text" },
          { id: "mountType", label: { ar: "نوع الهيكل الحامل", en: "Mounting Structure Type" }, hint: { ar: "ثابت / متتبع", en: "fixed / tracker" }, type: "text" },
          { id: "shadeArea", label: { ar: "المساحة المتاحة بدون ظل", en: "Available Shade-free Area" }, hint: { ar: "م2", en: "m2" }, type: "text" },
          { id: "panelCableDist", label: { ar: "مسافة كابلات الألواح", en: "Panel Wiring Distance" }, hint: { ar: "متر", en: "meters" }, type: "text" },
        ]
      },
      {
        label: { ar: "المولد الديزل", en: "Diesel Generator Option" }, accentClass: "subgroup-diesel", cols3: true,
        showIf: { field: "powerSourceType", value: "diesel" },
        fields: [
          { id: "genCapacity", label: { ar: "القدرة الفعلية للمولد", en: "Generator Actual Capacity" }, hint: { ar: "kVA", en: "kVA" }, type: "text" },
          { id: "genBrand", label: { ar: "ماركة / نوع المولد", en: "Generator Brand / Type" }, type: "text" },
          { id: "genCondition", label: { ar: "حالة المولد", en: "Generator Condition" }, hint: { ar: "جديد / مستعمل", en: "new / existing" }, type: "text" },
          { id: "atsPresent", label: { ar: "وجود قاطع تحويل تلقائي (ATS)؟", en: "Automatic Transfer Switch (ATS) Present?" }, type: "select", options: YN_OPTIONS },
          { id: "genLocation", label: { ar: "موقع / غرفة المولد", en: "Generator Location / Housing" }, type: "text" },
        ]
      },
      {
        label: { ar: "محول الشبكة الكهربائية", en: "Grid / Transformer Option" }, accentClass: "subgroup-grid", cols3: true,
        showIf: { field: "powerSourceType", value: "grid" },
        fields: [
          { id: "gridVoltage", label: { ar: "جهد الدخول الفعلي المقاس", en: "Measured Actual Input Voltage" }, hint: { ar: "فولت، بين خطين / خط وحيادي", en: "V, L-L / L-N" }, type: "text" },
          { id: "gridFreq", label: { ar: "التردد", en: "Frequency" }, hint: { ar: "هرتز", en: "Hz" }, type: "text" },
          { id: "transformerCap", label: { ar: "سعة المحول", en: "Transformer Capacity" }, hint: { ar: "kVA", en: "kVA" }, type: "text" },
          { id: "gridDistance", label: { ar: "المسافة لأقرب عمود / محول كهرباء", en: "Nearest Grid Pole/Transformer Distance" }, hint: { ar: "متر", en: "meters" }, type: "text" },
          { id: "voltageStability", label: { ar: "استقرار الجهد", en: "Voltage Stability" }, hint: { ar: "تذبذب ملحوظ إن وجد", en: "fluctuation observed" }, type: "text" },
        ]
      },
      {
        cols1: true,
        fields: [ sectionNotesField("powerNotes", "ملاحظات خاصة بمصدر الكهرباء", "Power Source Notes") ]
      }
    ]
  },

  /* =========================================================
     6. Control Panel Specifications
  ========================================================= */
  {
    id: "s6",
    title: { ar: "مواصفات لوحة التشغيل والتحكم", en: "Control Panel Specifications" },
    groups: [
      {
        label: { ar: "مكونات لوحة الكهرباء", en: "Electrical Panel Components" }, accentClass: "subgroup-grid", cols3: true,
        fields: [
          { id: "compMccb", label: { ar: "MCCB (قاطع عمومي)", en: "MCCB (Main Breaker)" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compMcp", label: { ar: "MCP قاطع أحادي القطب (1 Pole)", en: "MCP (1 Pole Breaker)" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compContactor", label: { ar: "كونتاكتور (Contactor)", en: "Contactor" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compLevelProtection", label: { ar: "حماية مستوى المياه (Level Protection)", en: "Level Protection" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compVoltageProtection", label: { ar: "حماية الجهد (Voltage Protection)", en: "Voltage Protection" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compCurrentProtection", label: { ar: "حماية التيار (Current Protection)", en: "Current Protection" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compTimer", label: { ar: "تايمر (Timer)", en: "Timer" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compMultimeter", label: { ar: "عداد قياس (Multimeter)", en: "Multimeter" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compPushButton", label: { ar: "بوتون تشغيل (Push Button)", en: "Push Button" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compLamps", label: { ar: "لمبات إشارة (Indicator Lamps)", en: "Indicator Lamps" }, type: "select", options: PRESENT_OPTIONS },
          { id: "compFilter", label: { ar: "فلتر (Filter)", en: "Filter" }, type: "select", options: PRESENT_OPTIONS },
        ]
      },
      {
        fields: [
          { id: "vfdBrand", label: { ar: "ماركة عاكس التردد / الإنفرتر (VFD)", en: "VFD / Inverter Brand" }, type: "text" },
          { id: "vfdPower", label: { ar: "قدرة الإنفرتر", en: "VFD / Inverter Power Rating" }, hint: { ar: "كيلوواط", en: "kW" }, type: "text" },
          { id: "dcBreaker", label: { ar: "سعة قاطع التيار المستمر (DC)", en: "DC Circuit Breaker Capacity" }, hint: { ar: "أمبير", en: "Amps" }, type: "text" },
          { id: "acBreaker", label: { ar: "سعة / نوع قاطع التيار المتردد (AC)", en: "AC Breaker Capacity / Type" }, hint: { ar: "أمبير", en: "Amps" }, type: "text" },
          { id: "spd", label: { ar: "وجود وحدة حماية من الصواعق وارتفاع الجهد المفاجئ (SPD)؟", en: "Surge Protection Device (SPD) Installed?" }, hint: { ar: "نعم / لا، النوع", en: "Yes / No, Type" }, type: "text" },
          { id: "ventilation", label: { ar: "نظام التهوية الداخلي للوحة", en: "Panel Ventilation System" }, hint: { ar: "مراوح / فتحات، العدد", en: "fans / louvers, quantity" }, type: "text" },
          { id: "filters", label: { ar: "نوع الفلاتر وفترة الصيانة", en: "Air Filter Type & Maintenance Interval" }, type: "text" },
          { id: "ipRating", label: { ar: "درجة الحماية والعزل (IP Rating)", en: "Panel IP Rating" }, hint: { ar: "مثال: IP54 / IP65", en: "e.g. IP54 / IP65" }, type: "text" },
          { id: "enclosureMaterial", label: { ar: "مادة هيكل اللوحة وأبعادها", en: "Panel Enclosure Material" }, hint: { ar: "معدن / بوليستر", en: "metal / polyester, dimensions" }, type: "text" },
          { id: "meteringUnit", label: { ar: "وحدة القياس / شاشة العرض", en: "Metering / Display Unit" }, type: "text" },
          { id: "scada", label: { ar: "هل مطلوب نظام مراقبة عن بعد SCADA؟", en: "Remote Monitoring / SCADA Required?" }, type: "select", options: YN_OPTIONS },
          { id: "panelLocation", label: { ar: "موقع تركيب اللوحة", en: "Panel Mounting Location" }, hint: { ar: "المسافة من رأس البئر، التعرض للشمس", en: "distance from wellhead, sun exposure" }, type: "text" },
          { id: "earthing", label: { ar: "وجود نظام تأريض (Earthing)؟", en: "Earthing / Grounding System Present?" }, type: "select", options: YN_OPTIONS },
        ]
      },
      {
        cols1: true,
        fields: [ sectionNotesField("panelNotes", "ملاحظات خاصة بلوحة التحكم", "Control Panel Notes") ]
      }
    ]
  },

  /* =========================================================
     7. Cables, Routing & Distances
  ========================================================= */
  {
    id: "s7",
    title: { ar: "الكابلات والتشغيل والمسافات", en: "Cables, Routing & Distances" },
    groups: [
      {
        fields: [
          { id: "cableCrossSection", label: { ar: "مساحة مقطع الكابل الغاطس", en: "Submersible Cable Cross-Section" }, hint: { ar: "مم2", en: "mm2" }, type: "text" },
          { id: "cableLength", label: { ar: "طول الكابل الغاطس (داخل البئر)", en: "Submersible Cable Length (in well)" }, hint: { ar: "متر", en: "meters" }, type: "text" },
          { id: "conductorMaterial", label: { ar: "مادة الموصل", en: "Conductor Material" }, hint: { ar: "نحاس / ألومنيوم", en: "copper / aluminum" }, type: "text" },
          { id: "cableType", label: { ar: "نوع الكابل / تصنيف العزل", en: "Cable Type / Insulation Rating" }, hint: { ar: "مثال: NYY", en: "e.g. NYY" }, type: "text" },
          { id: "distWellPanel", label: { ar: "المسافة الأفقية: البئر إلى اللوحة", en: "Horizontal Distance: Well → Control Panel" }, hint: { ar: "متر", en: "meters" }, type: "text" },
          { id: "distPanelSource", label: { ar: "المسافة الأفقية: اللوحة إلى مصدر الكهرباء", en: "Horizontal Distance: Panel → Power Source" }, hint: { ar: "متر", en: "meters" }, type: "text" },
          { id: "distPanelPv", label: { ar: "مسافة كابل الألواح الشمسية إلى اللوحة", en: "PV Array Cable Distance to Panel" }, hint: { ar: "متر", en: "meters" }, type: "text" },
          { id: "routeCondition", label: { ar: "حالة مسار الكابل", en: "Cable Route Condition" }, hint: { ar: "مدفون / خندق / مكشوف، عوائق", en: "buried / trenched / open, obstacles" }, type: "text" },
          { id: "voltageDrop", label: { ar: "هل مطلوب حساب هبوط الجهد؟", en: "Voltage Drop Calculation Needed?" }, type: "select", options: YN_OPTIONS },
          { id: "cableProtection", label: { ar: "طريقة حماية الكابل", en: "Cable Protection Method" }, hint: { ar: "مواسير / قنوات / دفن مباشر", en: "conduit / duct / direct burial" }, type: "text" },
        ]
      },
      {
        cols1: true,
        fields: [ sectionNotesField("cableNotes", "ملاحظات خاصة بالكابلات", "Cables & Routing Notes") ]
      }
    ]
  },

  /* =========================================================
     8. Technical Site Notes & Observations
  ========================================================= */
  {
    id: "s8",
    title: { ar: "ملاحظات فنية سريعة عن الموقع", en: "Technical Site Notes & Observations" },
    groups: [{
      cols1: true,
      fields: [
        { id: "notes", label: { ar: "ملاحظات إضافية", en: "Additional Notes" },
          hint: {
            ar: "طبيعة شبكة الري ومتطلبات الضغط، جودة/طعم/رائحة المياه، عوائق إنشائية أو صعوبة الوصول، اعتبارات أمنية، حالة المعدات الحالية، إمكانية وصول معدات النقل والرفع، أعمال إنشائية متوقعة، أو أي متطلبات خاصة بالعميل.",
            en: "Irrigation network type & pressure requirements, water quality/taste/odor, structural or access obstacles, security concerns, existing equipment condition, delivery/crane access, expected construction works, or any client-specific requirements."
          }, type: "textarea" },
        { id: "recommendations", label: { ar: "التوصيات", en: "Recommendations" },
          hint: { ar: "اكتب توصياتك للعميل بناءً على المعاينة", en: "Write your recommendations for the client based on the survey" },
          type: "textarea" },
        { id: "photos", label: { ar: "صور الموقع", en: "Site Photos" }, type: "photos" },
        { id: "video", label: { ar: "فيديو الموقع", en: "Site Video" }, type: "video" },
      ]
    }]
  },

  /* =========================================================
     9. Survey Sign-off
  ========================================================= */
  {
    id: "s9",
    title: { ar: "اعتماد المعاينة", en: "Survey Sign-off" },
    groups: [{
      fields: [
        { id: "engineerSign", label: { ar: "اسم وتوقيع المهندس القائم بالمعاينة", en: "Surveying Engineer Name & Signature" }, type: "text" },
        { id: "clientSignName", label: { ar: "اسم ممثل العميل / الموقع", en: "Client / Site Representative Name" }, type: "text" },
        { id: "clientSignature", label: { ar: "توقيع العميل", en: "Client Signature" },
          hint: { ar: "توقيع إلكتروني مباشر كضمان رسمي بمعاينة الموقع", en: "Direct e-signature as formal confirmation of the site survey" },
          type: "signature", cols: "full" },
        { id: "signDate", label: { ar: "التاريخ", en: "Date" }, type: "date" },
        { id: "companyStamp", label: { ar: "ختم الشركة المعتمد", en: "Official Company Stamp" }, type: "stamp" },
      ]
    }]
  },
];
