const form = document.getElementById("registrationForm");
const submitMessage = document.getElementById("submitMessage");
const clearDraftBtn = document.getElementById("clearDraftBtn");
const submitBtn = document.getElementById("submitBtn");
const avatarInput = document.getElementById("avatar");
const avatarPreview = document.getElementById("avatarPreview");
const previewCard = document.getElementById("previewCard");
const uploadTitle = document.getElementById("uploadTitle");
const uploadDescription = document.getElementById("uploadDescription");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmPasswordField = document.getElementById("confirmPasswordField");
const passwordHint = document.getElementById("passwordHint");
const confirmPasswordHint = document.getElementById("confirmPasswordHint");
const strengthBar = document.querySelector(".strength-bar");
const progressFill = document.getElementById("progressFill");
const progressValue = document.getElementById("progressValue");
const progressNote = document.getElementById("progressNote");
const galleryCards = Array.from(
  document.querySelectorAll("[data-gallery-slot]"),
);
const galleryPrevBtn = document.getElementById("galleryPrevBtn");
const galleryNextBtn = document.getElementById("galleryNextBtn");
const campusGallery = document.querySelector(".campus-gallery");
const mobileGalleryQuery = window.matchMedia("(max-width: 720px)");
const openCardMakerBtn = document.getElementById("openCardMakerBtn");
const closeCardMakerBtn = document.getElementById("closeCardMakerBtn");
const cardMakerModal = document.getElementById("cardMakerModal");
const cardTemplateOptions = Array.from(
  document.querySelectorAll("[data-card-template]"),
);
const downloadCardBtn = document.getElementById("downloadCardBtn");
const cardMakerHint = document.getElementById("cardMakerHint");
const businessCardCanvas = document.getElementById("businessCardCanvas");
const businessCardContext = businessCardCanvas.getContext("2d");

const previewBindings = {
  studentName: document.getElementById("cardName"),
  age: document.getElementById("cardAge"),
  email: document.getElementById("cardEmail"),
  phone: document.getElementById("cardPhone"),
};

const draftKey = "student-registration-draft";
const defaultAvatar = avatarPreview.src;
const defaultUploadTitle = uploadTitle.textContent;
const defaultUploadDescription = uploadDescription.textContent;
const galleryItems = [
  {
    src: "1.jpg",
    alt: "鏍″洯椋庢櫙灞曠ず涓€",
    eyebrow: "Lovely Campus",
    title: "缇庡ソ鏍″洯",
    objectPosition: "center center",
  },
  {
    src: "2.png",
    alt: "鏍″洯椋庢櫙灞曠ず浜?,
    eyebrow: "Learning Space",
    title: "瀛︿範绌洪棿",
    objectPosition: "center 42%",
  },
  {
    src: "3.png",
    alt: "鏍″洯椋庢櫙灞曠ず涓?,
    eyebrow: "Campus Recall",
    title: "鏍″洯鍥炲繂",
    objectPosition: "center center",
  },
  {
    src: "4.png",
    alt: "鏍″洯椋庢櫙灞曠ず鍥?,
    eyebrow: "Architecture",
    title: "寤虹瓚椋庤矊",
    objectPosition: "center 38%",
  },
  {
    src: "5.webp",
    alt: "鏍″洯椋庢櫙灞曠ず浜?,
    eyebrow: "Willows And Orioles",
    title: "鏌虫氮闂昏幒",
    objectPosition: "center center",
  },
  {
    src: "6.webp",
    alt: "鏍″洯椋庢櫙灞曠ず鍏?,
    eyebrow: "Molten Sunset",
    title: "钀芥棩鐔旈噾",
    objectPosition: "center 46%",
  },
  {
    src: "7.webp",
    alt: "鏍″洯椋庢櫙灞曠ず涓?,
    eyebrow: "Autumn Charm",
    title: "绉嬭壊瀹滀汉",
    objectPosition: "center 44%",
  },
  {
    src: "8.jpg",
    alt: "鏍″洯椋庢櫙灞曠ず鍏?,
    eyebrow: "Campus Story",
    title: "鏍″洯鏁呬簨",
    objectPosition: "center center",
  },
];
const cardTemplates = [
  {
    id: "sunrise",
    name: "鏅ㄦ洣鏍″洯",
    background: ["#233a59", "#b45f34", "#f2c792"],
    panel: "rgba(255, 247, 238, 0.88)",
    panelStrong: "rgba(255, 252, 248, 0.96)",
    textPrimary: "#1f2937",
    textSecondary: "#5b6472",
    accent: "#b86734",
    accentSoft: "rgba(184, 103, 52, 0.12)",
    footer: "#fff3e7",
  },
  {
    id: "aurora",
    name: "涓撲笟钃濊皟",
    background: ["#102743", "#1c6570", "#9fd7db"],
    panel: "rgba(13, 25, 42, 0.78)",
    panelStrong: "rgba(18, 33, 56, 0.88)",
    textPrimary: "#f5fbff",
    textSecondary: "rgba(219, 236, 247, 0.82)",
    accent: "#8fd7d9",
    accentSoft: "rgba(143, 215, 217, 0.12)",
    footer: "#d8eef1",
  },
  {
    id: "paper",
    name: "绾告劅杞诲ア",
    background: ["#fffaf4", "#eadfce", "#c46d44"],
    panel: "rgba(255, 255, 255, 0.86)",
    panelStrong: "rgba(255, 252, 247, 0.96)",
    textPrimary: "#27313d",
    textSecondary: "#6f655d",
    accent: "#c46d44",
    accentSoft: "rgba(196, 109, 68, 0.12)",
    footer: "#fff8f0",
  },
  {
    id: "emerald",
    name: "妫郴缈犲奖",
    background: ["#143a36", "#2d7d67", "#d5f0df"],
    panel: "rgba(241, 251, 245, 0.84)",
    panelStrong: "rgba(250, 255, 252, 0.94)",
    textPrimary: "#18332e",
    textSecondary: "#4f6d66",
    accent: "#2f7d67",
    accentSoft: "rgba(47, 125, 103, 0.12)",
    footer: "#effaf2",
  },
  {
    id: "ruby",
    name: "缁厜鏄犲儚",
    background: ["#42172a", "#a63e58", "#f5bf93"],
    panel: "rgba(255, 246, 244, 0.84)",
    panelStrong: "rgba(255, 251, 248, 0.94)",
    textPrimary: "#341a28",
    textSecondary: "#755361",
    accent: "#a63e58",
    accentSoft: "rgba(166, 62, 88, 0.12)",
    footer: "#fff0ea",
  },
  {
    id: "midnight",
    name: "澶滃箷鏄熸渤",
    background: ["#121626", "#2a3358", "#9aa8dd"],
    panel: "rgba(15, 18, 35, 0.78)",
    panelStrong: "rgba(20, 25, 48, 0.88)",
    textPrimary: "#f5f7ff",
    textSecondary: "rgba(214, 220, 248, 0.82)",
    accent: "#a8b4eb",
    accentSoft: "rgba(168, 180, 235, 0.12)",
    footer: "#e8ecff",
  },
];

let galleryStartIndex = 0;
let galleryTimerId = null;
let isGalleryAnimating = false;
let selectedCardTemplate = cardTemplates[0].id;
const galleryOutDuration = 420;
const galleryInDuration = 640;

function isMobileGalleryLayout() {
  return mobileGalleryQuery.matches;
}

function setGalleryButtonsDisabled(disabled) {
  galleryPrevBtn.disabled = disabled;
  galleryNextBtn.disabled = disabled;
  galleryPrevBtn.classList.toggle("is-disabled", disabled);
  galleryNextBtn.classList.toggle("is-disabled", disabled);
}

function setGalleryCardContent(card, item) {
  const image = card.querySelector(".gallery-image");
  const eyebrow = card.querySelector(".gallery-overlay p");
  const title = card.querySelector(".gallery-overlay h3");

  image.src = item.src;
  image.alt = item.alt;
  image.style.objectPosition = item.objectPosition;
  eyebrow.textContent = item.eyebrow;
  title.textContent = item.title;
}

function getProfileData() {
  const name = form.studentName.value.trim() || "寮犲悓瀛?;
  const age = calculateAge(form.birthday.value);
  const gender = getSelectedGender();
  const department = form.department.value || "寰呭畬鍠勯櫌绯?;
  const major = form.major.value.trim() || "寰呭畬鍠勪笓涓?;
  const className = form.className.value.trim() || "寰呭畬鍠勭彮绾?;
  const studentId = form.studentId.value.trim() || "寰呭畬鍠勫鍙?;
  const email = form.email.value.trim() || "example@student.edu.cn";
  const phone = form.phone.value.trim() || "鏈～鍐欒仈绯荤數璇?;

  return {
    name,
    ageLabel: age === null ? "鐢熸棩寰呭畬鍠? : `${age} 宀乣,
    gender,
    department,
    major,
    className,
    studentId,
    email,
    phone,
    avatarSrc: avatarPreview.src,
  };
}

function getSelectedCardTemplate() {
  return (
    cardTemplates.find((template) => template.id === selectedCardTemplate) ||
    cardTemplates[0]
  );
}

function drawRoundedRect(context, x, y, width, height, radius) {
  const actualRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + actualRadius, y);
  context.lineTo(x + width - actualRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + actualRadius);
  context.lineTo(x + width, y + height - actualRadius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - actualRadius,
    y + height,
  );
  context.lineTo(x + actualRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - actualRadius);
  context.lineTo(x, y + actualRadius);
  context.quadraticCurveTo(x, y, x + actualRadius, y);
  context.closePath();
}

function fillRoundedRect(context, x, y, width, height, radius, fillStyle) {
  context.save();
  context.fillStyle = fillStyle;
  drawRoundedRect(context, x, y, width, height, radius);
  context.fill();
  context.restore();
}

function drawWrappedText(
  context,
  text,
  x,
  y,
  maxWidth,
  lineHeight,
  maxLines = 2,
) {
  const content = text || "寰呭畬鍠勪俊鎭?;
  const chars = Array.from(content);
  const lines = [];
  let currentLine = "";

  chars.forEach((char) => {
    const testLine = `${currentLine}${char}`;
    if (context.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = char;
      return;
    }
    currentLine = testLine;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  const visibleLines = lines.slice(0, maxLines).map((line, index) => {
    if (index !== maxLines - 1 || lines.length <= maxLines) {
      return line;
    }

    let trimmed = line;
    while (
      trimmed.length > 0 &&
      context.measureText(`${trimmed}...`).width > maxWidth
    ) {
      trimmed = trimmed.slice(0, -1);
    }
    return `${trimmed}...`;
  });

  visibleLines.forEach((line, index) => {
    context.fillText(line, x, y + index * lineHeight);
  });

  return y + (visibleLines.length - 1) * lineHeight;
}

function drawPill(context, text, x, y, background, color) {
  context.save();
  context.font = "500 28px Outfit, Microsoft YaHei, sans-serif";
  const width = context.measureText(text).width + 36;
  fillRoundedRect(context, x, y, width, 52, 26, background);
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.fillText(text, x + 18, y + 26);
  context.restore();
  return width;
}

function getFittedFont(
  context,
  text,
  baseSize,
  minSize,
  maxWidth,
  fontFamily,
  fontWeight = 600,
) {
  let fontSize = baseSize;
  while (fontSize > minSize) {
    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    if (context.measureText(text).width <= maxWidth) {
      break;
    }
    fontSize -= 2;
  }
  return `${fontWeight} ${fontSize}px ${fontFamily}`;
}

function createCardFileName() {
  const safeName = getProfileData().name.replace(/[\\/:*?"<>|]/g, "-");
  return `${safeName || "student-card"}-鍚嶇墖.png`;
}

function updateCardMakerHint() {
  const isMobile = isMobileGalleryLayout();
  const canShareFiles =
    isMobile &&
    typeof navigator.canShare === "function" &&
    typeof File !== "undefined" &&
    navigator.canShare({
      files: [new File([""], "a.png", { type: "image/png" })],
    });

  if (canShareFiles) {
    cardMakerHint.textContent =
      "褰撳墠璁惧鏀寔绯荤粺鍒嗕韩锛岀偣鍑讳繚瀛樺悗浼氫紭鍏堣皟璧风郴缁熷垎浜潰鏉匡紝鍙洿鎺ュ瓨鍏ョ浉鍐屾垨鍙戦€佸埌鏂囦欢銆?;
    return;
  }

  if (isMobile) {
    cardMakerHint.textContent =
      "閮ㄥ垎鎵嬫満娴忚鍣ㄦ棤娉曠洿鎺ュ啓鍏ョ郴缁熺浉鍐岋紝鐐瑰嚮淇濆瓨鍚庝細涓嬭浇 PNG 鍒扮郴缁熺洰褰曪紝鍙湪鐩稿唽鎴栨枃浠朵腑鏌ョ湅銆?;
    return;
  }

  if ("showSaveFilePicker" in window) {
    cardMakerHint.textContent =
      "褰撳墠娴忚鍣ㄦ敮鎸佽嚜閫変繚瀛樹綅缃紝鐐瑰嚮淇濆瓨鍚庝細寮瑰嚭璺緞閫夋嫨銆?;
    return;
  }

  cardMakerHint.textContent = "褰撳墠娴忚鍣ㄥ皢鐩存帴涓嬭浇 PNG 鍒伴粯璁や笅杞界洰褰曘€?;
}

function drawBusinessCardBackground(context, template, width, height) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, template.background[0]);
  gradient.addColorStop(0.52, template.background[1]);
  gradient.addColorStop(1, template.background[2]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.18;
  context.fillStyle = template.footer;
  context.beginPath();
  context.arc(width - 120, 150, 240, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(110, height - 110, 180, 0, Math.PI * 2);
  context.fill();
  context.restore();

  fillRoundedRect(
    context,
    52,
    52,
    width - 104,
    height - 104,
    54,
    template.panel,
  );
  fillRoundedRect(context, 86, 86, width - 172, 306, 40, template.panelStrong);
  fillRoundedRect(context, 86, 430, width - 172, 520, 40, template.panelStrong);
}

async function renderBusinessCardPreview() {
  const context = businessCardContext;
  const canvas = businessCardCanvas;
  const width = canvas.width;
  const height = canvas.height;
  const profile = getProfileData();
  const template = getSelectedCardTemplate();

  context.clearRect(0, 0, width, height);
  drawBusinessCardBackground(context, template, width, height);

  context.save();
  context.fillStyle = template.accentSoft;
  fillRoundedRect(context, 126, 126, 188, 188, 94, template.accentSoft);
  context.restore();

  const avatarImage = await new Promise((resolve) => {
    if (avatarPreview.complete && avatarPreview.naturalWidth > 0) {
      resolve(avatarPreview);
      return;
    }

    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(avatarPreview);
    image.src = profile.avatarSrc;
  });

  context.save();
  context.beginPath();
  context.arc(220, 220, 82, 0, Math.PI * 2);
  context.closePath();
  context.clip();
  context.drawImage(avatarImage, 138, 138, 164, 164);
  context.restore();

  context.fillStyle = template.textPrimary;
  context.font = "700 72px Noto Serif SC, Microsoft YaHei, serif";
  context.fillText(profile.name, 342, 198);

  let pillX = 342;
  pillX +=
    drawPill(
      context,
      profile.ageLabel,
      pillX,
      228,
      template.accentSoft,
      template.accent,
    ) + 14;
  drawPill(
    context,
    profile.gender,
    pillX,
    228,
    template.accentSoft,
    template.accent,
  );

  context.fillStyle = template.textSecondary;
  context.font = "500 28px Outfit, Microsoft YaHei, sans-serif";
  context.fillText("Student Enrollment Portal", 342, 304);

  context.fillStyle = template.accent;
  context.font = "600 30px Outfit, Microsoft YaHei, sans-serif";
  context.fillText("PERSONAL PROFILE", 126, 492);

  context.fillStyle = template.textPrimary;
  context.font = "600 42px Noto Serif SC, Microsoft YaHei, serif";
  context.fillText("淇℃伅鍚嶇墖", 126, 548);

  context.fillStyle = template.textSecondary;
  context.font = "500 30px Outfit, Microsoft YaHei, sans-serif";
  drawWrappedText(
    context,
    `${profile.department} 路 ${profile.major} 路 ${profile.className}`,
    126,
    604,
    width - 252,
    42,
    2,
  );

  const infoBlocks = [
    { label: "瀛﹀彿", value: profile.studentId },
    { label: "鑱旂郴鐢佃瘽", value: profile.phone },
    { label: "鐢靛瓙閭", value: profile.email },
  ];

  infoBlocks.forEach((item, index) => {
    const top = 672 + index * 124;
    fillRoundedRect(
      context,
      126,
      top - 38,
      width - 252,
      96,
      24,
      template.accentSoft,
    );
    context.fillStyle = template.accent;
    context.font = "600 24px Outfit, Microsoft YaHei, sans-serif";
    context.fillText(item.label, 154, top + 8);

    context.save();
    context.fillStyle = template.textPrimary;
    context.font = getFittedFont(
      context,
      item.value,
      31,
      20,
      width - 452,
      "Outfit, Microsoft YaHei, sans-serif",
    );
    drawWrappedText(context, item.value, 338, top + 8, width - 474, 32, 2);
    context.restore();
  });

  context.fillStyle = template.footer;
  context.font = "500 24px Outfit, Microsoft YaHei, sans-serif";
  context.fillText("JingRC", width - 172, 1222);
}

function renderBusinessCardPreviewIfNeeded() {
  if (!cardMakerModal.hidden) {
    void renderBusinessCardPreview();
  }
}

function openCardMaker() {
  cardMakerModal.hidden = false;
  document.body.classList.add("modal-open");
  updateCardMakerHint();
  void renderBusinessCardPreview();
}

function closeCardMaker() {
  cardMakerModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function selectCardTemplate(templateId) {
  selectedCardTemplate = templateId;
  cardTemplateOptions.forEach((button) => {
    const selected = button.dataset.cardTemplate === templateId;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  void renderBusinessCardPreview();
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }
        reject(new Error("鍚嶇墖鐢熸垚澶辫触"));
      },
      "image/png",
      1,
    );
  });
}

function triggerCardDownload(blob, fileName) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1200);
}

async function saveBusinessCard() {
  try {
    downloadCardBtn.disabled = true;
    downloadCardBtn.textContent = "姝ｅ湪鐢熸垚...";
    await renderBusinessCardPreview();

    const blob = await canvasToBlob(businessCardCanvas);
    const fileName = createCardFileName();
    const canShareFiles =
      isMobileGalleryLayout() &&
      typeof navigator.canShare === "function" &&
      typeof File !== "undefined";

    if (canShareFiles) {
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "瀛︾敓娉ㄥ唽鍚嶇墖",
            text: "杩欐槸鏍规嵁褰撳墠璧勬枡鑷姩鐢熸垚鐨勫悕鐗囧浘鐗囥€?,
          });
          showMessage("鍚嶇墖鍥剧墖宸茶皟璧风郴缁熷垎浜€?, true);
          return;
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            triggerCardDownload(blob, fileName);
            showMessage("绯荤粺鍒嗕韩涓嶅彲鐢紝宸叉敼涓轰笅杞藉悕鐗囧浘鐗囥€?, true);
            return;
          }
          return;
        }
      }
    }

    if (!isMobileGalleryLayout() && "showSaveFilePicker" in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "PNG 鍥剧墖",
              accept: {
                "image/png": [".png"],
              },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        showMessage("鍚嶇墖鍥剧墖宸蹭繚瀛樺埌浣犻€夋嫨鐨勪綅缃€?, true);
        return;
      } catch (error) {
        if (!(error instanceof Error) || error.name !== "AbortError") {
          triggerCardDownload(blob, fileName);
          showMessage("褰撳墠娴忚鍣ㄦ湭瀹屾垚璺緞淇濆瓨锛屽凡鏀逛负涓嬭浇鍚嶇墖鍥剧墖銆?, true);
          return;
        }
        return;
      }
    }

    triggerCardDownload(blob, fileName);
    showMessage(
      isMobileGalleryLayout()
        ? "鍚嶇墖鍥剧墖宸插紑濮嬩笅杞斤紝鍙湪绯荤粺鐩稿唽鎴栨枃浠朵腑鏌ョ湅銆?
        : "鍚嶇墖鍥剧墖宸蹭笅杞藉埌榛樿鐩綍銆?,
      true,
    );
  } catch {
    showMessage("鍚嶇墖鐢熸垚澶辫触锛岃绋嶅悗閲嶈瘯銆?, false);
  } finally {
    downloadCardBtn.disabled = false;
    downloadCardBtn.textContent = "淇濆瓨鍚嶇墖鍥剧墖";
  }
}

function getCompletionState() {
  const checks = [
    form.studentName.value.trim().length > 0,
    !!form.querySelector("input[name='gender']:checked"),
    form.studentId.checkValidity(),
    form.phone.checkValidity(),
    form.email.checkValidity(),
    form.birthday.checkValidity(),
    form.department.checkValidity(),
    form.major.checkValidity(),
    form.className.checkValidity(),
    passwordInput.checkValidity(),
    confirmPasswordInput.checkValidity() &&
      confirmPasswordInput.value === passwordInput.value,
  ];

  const completed = checks.filter(Boolean).length;
  return {
    completed,
    total: checks.length,
    isComplete: completed === checks.length,
  };
}

function renderGallery() {
  const mobileLayout = isMobileGalleryLayout();

  campusGallery.classList.toggle("is-mobile", mobileLayout);

  galleryCards.forEach((card, index) => {
    const item =
      galleryItems[(galleryStartIndex + index) % galleryItems.length];

    setGalleryCardContent(card, item);
    card.classList.toggle("gallery-card--exit", !mobileLayout && index === 0);
    card.classList.toggle("gallery-card--enter", !mobileLayout && index === 2);
    card.setAttribute(
      "aria-hidden",
      mobileLayout && index > 0 ? "true" : "false",
    );
  });
}

function clearGalleryAnimations() {
  galleryCards.forEach((card) => {
    card.getAnimations().forEach((animation) => animation.cancel());
    const image = card.querySelector(".gallery-image");
    const overlay = card.querySelector(".gallery-overlay");
    image.getAnimations().forEach((animation) => animation.cancel());
    overlay.getAnimations().forEach((animation) => animation.cancel());
  });
}

function animateGalleryPhase(direction, phase) {
  if (isMobileGalleryLayout()) {
    const activeCard = galleryCards[0];
    const image = activeCard.querySelector(".gallery-image");
    const overlay = activeCard.querySelector(".gallery-overlay");
    const duration = phase === "out" ? 220 : 320;
    const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

    const cardFrames =
      phase === "out"
        ? [
            { opacity: 1, transform: "translateX(0) scale(1)" },
            {
              opacity: 0.64,
              transform: `translateX(${direction === 1 ? "-14px" : "14px"}) scale(0.985)`,
            },
          ]
        : [
            {
              opacity: 0.68,
              transform: `translateX(${direction === 1 ? "14px" : "-14px"}) scale(0.985)`,
            },
            { opacity: 1, transform: "translateX(0) scale(1)" },
          ];

    const imageFrames =
      phase === "out"
        ? [
            { transform: "scale(1.02)", filter: "saturate(0.98) blur(0px)" },
            { transform: "scale(1.06)", filter: "saturate(0.9) blur(1.2px)" },
          ]
        : [
            { transform: "scale(1.06)", filter: "saturate(0.9) blur(1.2px)" },
            { transform: "scale(1.02)", filter: "saturate(0.98) blur(0px)" },
          ];

    const overlayFrames =
      phase === "out"
        ? [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0.56, transform: "translateY(8px)" },
          ]
        : [
            { opacity: 0.56, transform: "translateY(8px)" },
            { opacity: 1, transform: "translateY(0)" },
          ];

    activeCard.animate(cardFrames, { duration, easing, fill: "forwards" });
    image.animate(imageFrames, { duration, easing, fill: "forwards" });
    overlay.animate(overlayFrames, { duration, easing, fill: "forwards" });
    return;
  }

  const movingLeft = direction === 1;

  galleryCards.forEach((card, index) => {
    const image = card.querySelector(".gallery-image");
    const overlay = card.querySelector(".gallery-overlay");

    let cardFrames;
    let imageFrames;
    let overlayFrames;

    if (phase === "out") {
      if (movingLeft) {
        const cardOutFrames = [
          [
            { transform: "translateX(0) scale(1)", opacity: 1, filter: "none" },
            {
              transform: "translateX(-20px) scale(0.965)",
              opacity: 0.58,
              filter: "blur(1.8px) saturate(0.86) brightness(0.9)",
            },
          ],
          [
            { transform: "translateX(0) scale(1)", opacity: 1, filter: "none" },
            {
              transform: "translateX(-14px) scale(0.985)",
              opacity: 0.9,
              filter: "blur(0.65px) saturate(0.95)",
            },
          ],
          [
            { transform: "translateX(0) scale(1)", opacity: 1, filter: "none" },
            {
              transform: "translateX(-10px) scale(0.995)",
              opacity: 0.94,
              filter: "blur(0.28px) saturate(0.98)",
            },
          ],
        ];

        const imageOutFrames = [
          [
            { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
            { transform: "scale(1.08)", filter: "saturate(0.84) blur(2.2px)" },
          ],
          [
            { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
            { transform: "scale(1.05)", filter: "saturate(0.93) blur(0.8px)" },
          ],
          [
            { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
            {
              transform: "scale(1.045)",
              filter: "saturate(0.97) blur(0.35px)",
            },
          ],
        ];

        const overlayOutFrames = [
          [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0.56, transform: "translateY(8px)" },
          ],
          [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0.82, transform: "translateY(4px)" },
          ],
          [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0.9, transform: "translateY(2px)" },
          ],
        ];

        cardFrames = cardOutFrames[index];
        imageFrames = imageOutFrames[index];
        overlayFrames = overlayOutFrames[index];
      } else {
        const reverseIndex = 2 - index;
        const cardOutFrames = [
          [
            { transform: "translateX(0) scale(1)", opacity: 1, filter: "none" },
            {
              transform: "translateX(20px) scale(0.965)",
              opacity: 0.58,
              filter: "blur(1.8px) saturate(0.86) brightness(0.9)",
            },
          ],
          [
            { transform: "translateX(0) scale(1)", opacity: 1, filter: "none" },
            {
              transform: "translateX(14px) scale(0.985)",
              opacity: 0.9,
              filter: "blur(0.65px) saturate(0.95)",
            },
          ],
          [
            { transform: "translateX(0) scale(1)", opacity: 1, filter: "none" },
            {
              transform: "translateX(10px) scale(0.995)",
              opacity: 0.94,
              filter: "blur(0.28px) saturate(0.98)",
            },
          ],
        ];

        const imageOutFrames = [
          [
            { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
            { transform: "scale(1.08)", filter: "saturate(0.84) blur(2.2px)" },
          ],
          [
            { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
            { transform: "scale(1.05)", filter: "saturate(0.93) blur(0.8px)" },
          ],
          [
            { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
            {
              transform: "scale(1.045)",
              filter: "saturate(0.97) blur(0.35px)",
            },
          ],
        ];

        const overlayOutFrames = [
          [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0.56, transform: "translateY(8px)" },
          ],
          [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0.82, transform: "translateY(4px)" },
          ],
          [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0.9, transform: "translateY(2px)" },
          ],
        ];

        cardFrames = cardOutFrames[reverseIndex];
        imageFrames = imageOutFrames[reverseIndex];
        overlayFrames = overlayOutFrames[reverseIndex];
      }
    } else if (movingLeft) {
      const cardInFrames = [
        [
          {
            transform: "translateX(12px) scale(0.978)",
            opacity: 0.7,
            filter: "blur(1.1px) saturate(0.9)",
          },
          {
            transform: "translateX(-1px) scale(0.988)",
            opacity: 0.84,
            filter: "blur(0.12px) saturate(0.94) brightness(0.95)",
          },
        ],
        [
          {
            transform: "translateX(16px) scale(0.988)",
            opacity: 0.82,
            filter: "blur(0.9px) saturate(0.93)",
          },
          { transform: "translateX(0) scale(1)", opacity: 1, filter: "none" },
        ],
        [
          {
            transform: "translateX(22px) scale(0.965)",
            opacity: 0.62,
            filter: "blur(1.8px) saturate(0.86) brightness(0.92)",
          },
          {
            transform: "translateX(1px) scale(1.01)",
            opacity: 1,
            filter: "none",
          },
        ],
      ];

      const imageInFrames = [
        [
          { transform: "scale(1.07)", filter: "saturate(0.86) blur(1.4px)" },
          {
            transform: "scale(1.035)",
            filter: "saturate(0.94) blur(0.18px)",
          },
        ],
        [
          { transform: "scale(1.06)", filter: "saturate(0.9) blur(1.05px)" },
          { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
        ],
        [
          { transform: "scale(1.085)", filter: "saturate(0.84) blur(2px)" },
          { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
        ],
      ];

      const overlayInFrames = [
        [
          { opacity: 0.58, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        [
          { opacity: 0.62, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        [
          { opacity: 0.52, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
      ];

      cardFrames = cardInFrames[index];
      imageFrames = imageInFrames[index];
      overlayFrames = overlayInFrames[index];
    } else {
      const reverseIndex = 2 - index;
      const cardInFrames = [
        [
          {
            transform: "translateX(-12px) scale(0.978)",
            opacity: 0.7,
            filter: "blur(1.1px) saturate(0.9)",
          },
          {
            transform: "translateX(-1px) scale(0.988)",
            opacity: 0.84,
            filter: "blur(0.12px) saturate(0.94) brightness(0.95)",
          },
        ],
        [
          {
            transform: "translateX(-16px) scale(0.988)",
            opacity: 0.82,
            filter: "blur(0.9px) saturate(0.93)",
          },
          { transform: "translateX(0) scale(1)", opacity: 1, filter: "none" },
        ],
        [
          {
            transform: "translateX(-22px) scale(0.965)",
            opacity: 0.62,
            filter: "blur(1.8px) saturate(0.86) brightness(0.92)",
          },
          {
            transform: "translateX(1px) scale(1.01)",
            opacity: 1,
            filter: "none",
          },
        ],
      ];

      const imageInFrames = [
        [
          { transform: "scale(1.07)", filter: "saturate(0.86) blur(1.4px)" },
          {
            transform: "scale(1.035)",
            filter: "saturate(0.94) blur(0.18px)",
          },
        ],
        [
          { transform: "scale(1.06)", filter: "saturate(0.9) blur(1.05px)" },
          { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
        ],
        [
          { transform: "scale(1.085)", filter: "saturate(0.84) blur(2px)" },
          { transform: "scale(1.035)", filter: "saturate(0.98) blur(0px)" },
        ],
      ];

      const overlayInFrames = [
        [
          { opacity: 0.58, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        [
          { opacity: 0.62, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        [
          { opacity: 0.52, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
      ];

      cardFrames = cardInFrames[reverseIndex];
      imageFrames = imageInFrames[reverseIndex];
      overlayFrames = overlayInFrames[reverseIndex];
    }

    const duration = phase === "out" ? galleryOutDuration : galleryInDuration;
    const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

    card.animate(cardFrames, { duration, easing, fill: "forwards" });
    image.animate(imageFrames, { duration, easing, fill: "forwards" });
    overlay.animate(overlayFrames, { duration, easing, fill: "forwards" });
  });
}

function rotateGallery(direction = 1) {
  if (isGalleryAnimating) {
    return;
  }

  isGalleryAnimating = true;
  setGalleryButtonsDisabled(true);
  animateGalleryPhase(direction, "out");

  const outDuration = isMobileGalleryLayout() ? 220 : galleryOutDuration;
  const inDuration = isMobileGalleryLayout() ? 320 : galleryInDuration;

  window.setTimeout(() => {
    clearGalleryAnimations();
    galleryStartIndex =
      (galleryStartIndex + direction + galleryItems.length) %
      galleryItems.length;
    renderGallery();
    animateGalleryPhase(direction, "in");

    window.setTimeout(() => {
      clearGalleryAnimations();
      renderGallery();
      isGalleryAnimating = false;
      setGalleryButtonsDisabled(false);
    }, inDuration);
  }, outDuration);
}

function restartGalleryTimer() {
  if (galleryTimerId !== null) {
    window.clearInterval(galleryTimerId);
  }
  galleryTimerId = window.setInterval(() => rotateGallery(1), 5000);
}

function updateFormProgress() {
  const { completed, total, isComplete } = getCompletionState();
  const percentage = Math.round((completed / total) * 100);

  progressFill.style.width = `${percentage}%`;
  progressValue.textContent = `${percentage}%`;

  if (isComplete) {
    progressNote.textContent = "淇℃伅宸插～鍐欏畬鏁达紝鍙互鎻愪氦銆?;
    submitBtn.disabled = false;
    submitBtn.textContent = "鎻愪氦娉ㄥ唽淇℃伅";
    return;
  }

  progressNote.textContent = `宸插畬鎴?${completed} / ${total} 椤瑰叧閿俊鎭€俙;
  submitBtn.disabled = true;
  submitBtn.textContent = "璇峰厛瀹屾垚濉啓";
}

function getSelectedGender() {
  const checked = form.querySelector("input[name='gender']:checked");
  return checked ? checked.value : "鏈€夋嫨鎬у埆";
}

function calculateAge(birthday) {
  if (!birthday) {
    return null;
  }

  const birthDate = new Date(birthday);
  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}

function updatePreview() {
  const name = form.studentName.value.trim() || "璇疯緭鍏ヤ綘鐨勫鍚?;
  const email = form.email.value.trim() || "example@student.edu.cn";
  const phone = form.phone.value.trim() || "鏈～鍐?;
  const major = form.major.value.trim();
  const className = form.className.value.trim();
  const department = form.department.value || "寰呭畬鍠勪俊鎭?;
  const age = calculateAge(form.birthday.value);
  const metaParts = [getSelectedGender(), department];

  if (major) {
    metaParts.push(major);
  }

  if (className) {
    metaParts.push(className);
  }

  previewBindings.studentName.textContent = name;
  previewBindings.age.textContent = age === null ? "鏈～鍐欑敓鏃? : `${age} 宀乣;
  previewBindings.email.textContent = email;
  previewBindings.phone.textContent = phone;
  document.getElementById("cardMeta").textContent = metaParts.join(" 路 ");
  renderBusinessCardPreviewIfNeeded();
}

function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

function updatePasswordStrength() {
  const score = calculateStrength(passwordInput.value);
  strengthBar.dataset.strength = String(score);

  const hints = [
    "瀵嗙爜闀垮害涓嶅皯浜?浣嶏紝寤鸿鍖呭惈瀛楁瘝銆佹暟瀛楀拰绗﹀彿銆?,
    "褰撳墠寮哄害杈冨急锛屽缓璁鍔犱綅鏁板拰瀛楃绉嶇被銆?,
    "褰撳墠寮哄害涓€鑸紝鍙啀鍔犲叆澶у皬鍐欐垨鐗规畩绗﹀彿銆?,
    "褰撳墠寮哄害鑹ソ锛屽凡鍏峰杈冨ソ鐨勫畨鍏ㄦ€с€?,
    "褰撳墠寮哄害寰堥珮锛屽彲浠ユ斁蹇冧娇鐢ㄣ€?,
  ];

  passwordHint.textContent = hints[score];
}

function updateConfirmPasswordHint() {
  const confirmPassword = confirmPasswordInput.value;
  const password = passwordInput.value;

  if (!confirmPassword) {
    confirmPasswordHint.textContent = "璇峰啀娆¤緭鍏ヤ笌鐧诲綍瀵嗙爜涓€鑷寸殑鍐呭銆?;
    confirmPasswordField.classList.remove("is-success");
    return;
  }

  if (confirmPassword === password) {
    confirmPasswordHint.textContent = "涓ゆ杈撳叆涓€鑷淬€?;
    confirmPasswordField.classList.add("is-success");
    return;
  }

  confirmPasswordHint.textContent = "涓ゆ杈撳叆鐨勫瘑鐮侀渶淇濇寔涓€鑷淬€?;
  confirmPasswordField.classList.remove("is-success");
}

function validateField(element) {
  const field = element.closest(".field") || element.closest("fieldset.field");
  if (!field) return true;

  let valid = element.checkValidity();
  if (element === confirmPasswordInput) {
    valid = valid && element.value === passwordInput.value;
  }

  field.classList.toggle("invalid", !valid);
  return valid;
}

function validateGender() {
  const fieldset = form.querySelector("fieldset.field");
  const hasSelection = !!form.querySelector("input[name='gender']:checked");
  fieldset.classList.toggle("invalid", !hasSelection);
  return hasSelection;
}

function serializeForm() {
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData.entries()) {
    if (key !== "avatar") {
      data[key] = value;
    }
  }
  data.avatarPreview = avatarPreview.src;
  return data;
}

function saveDraft() {
  localStorage.setItem(draftKey, JSON.stringify(serializeForm()));
}

function updateUploadState(file) {
  const uploadField = avatarInput.closest(".upload-field");
  if (!file) {
    uploadTitle.textContent = defaultUploadTitle;
    uploadDescription.textContent = defaultUploadDescription;
    uploadField.classList.remove("is-uploaded");
    return;
  }

  uploadTitle.textContent = "鐓х墖涓婁紶瀹屾垚";
  uploadDescription.textContent = `褰撳墠鏂囦欢锛?{file.name}`;
  uploadField.classList.add("is-uploaded");
}

function restoreDraft() {
  const draft = localStorage.getItem(draftKey);
  if (!draft) {
    updatePreview();
    updatePasswordStrength();
    updateFormProgress();
    return;
  }

  try {
    const data = JSON.parse(draft);
    Object.entries(data).forEach(([key, value]) => {
      if (key === "avatarPreview") {
        avatarPreview.src = value || defaultAvatar;
        return;
      }

      const field = form.elements.namedItem(key);
      if (!field) {
        return;
      }

      if (field instanceof RadioNodeList) {
        Array.from(field).forEach((radio) => {
          radio.checked = radio.value === value;
        });
        return;
      }

      field.value = value;
    });
  } catch {
    localStorage.removeItem(draftKey);
  }

  updatePreview();
  updatePasswordStrength();
  updateFormProgress();
}

function showMessage(message, success) {
  submitMessage.textContent = message;
  submitMessage.style.color = success ? "#2d8f6f" : "#b54747";
}

form.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches("input, textarea, select")) {
    if (target === passwordInput) {
      updatePasswordStrength();
      validateField(confirmPasswordInput);
      updateConfirmPasswordHint();
    }
    if (target === confirmPasswordInput) {
      updateConfirmPasswordHint();
    }
    validateField(target);
    updatePreview();
    updateFormProgress();
    saveDraft();
  }
});

form.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.matches("input[name='gender']")) {
    validateGender();
    updatePreview();
    updateFormProgress();
    saveDraft();
  }
});

form.addEventListener("focusin", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const field = target.closest(".field") || target.closest("fieldset.field");
  if (field) {
    field.classList.add("is-active");
  }
});

form.addEventListener("focusout", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const field = target.closest(".field") || target.closest("fieldset.field");
  if (field) {
    field.classList.remove("is-active");
  }
});

avatarInput.addEventListener("change", () => {
  const [file] = avatarInput.files || [];
  if (!file) {
    avatarPreview.src = defaultAvatar;
    updateUploadState(null);
    saveDraft();
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    avatarPreview.src = String(reader.result);
    previewCard.classList.remove("form-success");
    void previewCard.offsetWidth;
    previewCard.classList.add("form-success");
    updateUploadState(file);
    saveDraft();
    renderBusinessCardPreviewIfNeeded();
  };
  reader.readAsDataURL(file);
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    avatarPreview.src = defaultAvatar;
    strengthBar.dataset.strength = "0";
    passwordHint.textContent = "瀵嗙爜闀垮害涓嶅皯浜?浣嶏紝寤鸿鍖呭惈瀛楁瘝銆佹暟瀛楀拰绗﹀彿銆?;
    confirmPasswordHint.textContent = "璇峰啀娆¤緭鍏ヤ笌鐧诲綍瀵嗙爜涓€鑷寸殑鍐呭銆?;
    confirmPasswordField.classList.remove("is-success");
    updateUploadState(null);
    document
      .querySelectorAll(".invalid")
      .forEach((node) => node.classList.remove("invalid"));
    showMessage("琛ㄥ崟宸查噸缃紝璇烽噸鏂板～鍐欎俊鎭€?, true);
    updatePreview();
    updateFormProgress();
    localStorage.removeItem(draftKey);
  }, 0);
});

clearDraftBtn.addEventListener("click", () => {
  localStorage.removeItem(draftKey);
  form.reset();
  avatarPreview.src = defaultAvatar;
  updateUploadState(null);
  updatePreview();
  updateFormProgress();
  showMessage("鏈湴鑽夌宸叉竻闄ゃ€?, true);
});

galleryPrevBtn.addEventListener("click", () => {
  if (isGalleryAnimating) {
    return;
  }
  rotateGallery(-1);
  restartGalleryTimer();
});

galleryNextBtn.addEventListener("click", () => {
  if (isGalleryAnimating) {
    return;
  }
  rotateGallery(1);
  restartGalleryTimer();
});

openCardMakerBtn.addEventListener("click", () => {
  openCardMaker();
});

closeCardMakerBtn.addEventListener("click", () => {
  closeCardMaker();
});

cardMakerModal.addEventListener("click", (event) => {
  if (event.target === cardMakerModal) {
    closeCardMaker();
  }
});

cardTemplateOptions.forEach((button) => {
  button.addEventListener("click", () => {
    selectCardTemplate(button.dataset.cardTemplate);
  });
});

downloadCardBtn.addEventListener("click", () => {
  void saveBusinessCard();
});

mobileGalleryQuery.addEventListener("change", () => {
  clearGalleryAnimations();
  renderGallery();
  restartGalleryTimer();
  updateCardMakerHint();
  renderBusinessCardPreviewIfNeeded();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cardMakerModal.hidden) {
    closeCardMaker();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputs = Array.from(form.querySelectorAll("input, textarea, select"));
  const validInputs = inputs.every((input) => validateField(input));
  const validGender = validateGender();
  const passwordMatches = confirmPasswordInput.value === passwordInput.value;

  if (!passwordMatches) {
    validateField(confirmPasswordInput);
    showMessage("涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷达紝璇锋鏌ュ悗閲嶆柊鎻愪氦銆?, false);
    return;
  }

  if (!validInputs || !validGender) {
    showMessage("璇峰厛瀹屾暣骞舵纭～鍐欐墍鏈夊繀濉俊鎭€?, false);
    return;
  }

  showMessage("娉ㄥ唽淇℃伅鎻愪氦鎴愬姛锛屽綋鍓嶉〉闈㈠彲鐩存帴浣滀负瀹為獙鎴愭灉灞曠ず銆?, true);
  localStorage.setItem(draftKey, JSON.stringify(serializeForm()));
  previewCard.classList.remove("form-success");
  void previewCard.offsetWidth;
  previewCard.classList.add("form-success");
});

restoreDraft();
updateConfirmPasswordHint();
updateFormProgress();
renderGallery();
restartGalleryTimer();
updateCardMakerHint();
