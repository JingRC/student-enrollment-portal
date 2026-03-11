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
    alt: "校园风景展示一",
    eyebrow: "Lovely Campus",
    title: "美好校园",
    objectPosition: "center center",
  },
  {
    src: "2.png",
    alt: "校园风景展示二",
    eyebrow: "Learning Space",
    title: "学习空间",
    objectPosition: "center 42%",
  },
  {
    src: "3.png",
    alt: "校园风景展示三",
    eyebrow: "Campus Recall",
    title: "校园回忆",
    objectPosition: "center center",
  },
  {
    src: "4.png",
    alt: "校园风景展示四",
    eyebrow: "Architecture",
    title: "建筑风貌",
    objectPosition: "center 38%",
  },
  {
    src: "5.webp",
    alt: "校园风景展示五",
    eyebrow: "Willows And Orioles",
    title: "柳浪闻莺",
    objectPosition: "center center",
  },
  {
    src: "6.webp",
    alt: "校园风景展示六",
    eyebrow: "Molten Sunset",
    title: "落日熔金",
    objectPosition: "center 46%",
  },
  {
    src: "7.webp",
    alt: "校园风景展示七",
    eyebrow: "Autumn Charm",
    title: "秋色宜人",
    objectPosition: "center 44%",
  },
  {
    src: "8.jpg",
    alt: "校园风景展示八",
    eyebrow: "Campus Story",
    title: "校园故事",
    objectPosition: "center center",
  },
];
const cardTemplates = [
  {
    id: "sunrise",
    name: "晨曦校园",
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
    name: "专业蓝调",
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
    name: "纸感轻奢",
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
    name: "森系翠影",
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
    name: "绯光映像",
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
    name: "夜幕星河",
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
  const name = form.studentName.value.trim() || "张同学";
  const age = calculateAge(form.birthday.value);
  const gender = getSelectedGender();
  const department = form.department.value || "待完善院系";
  const major = form.major.value.trim() || "待完善专业";
  const className = form.className.value.trim() || "待完善班级";
  const studentId = form.studentId.value.trim() || "待完善学号";
  const email = form.email.value.trim() || "example@student.edu.cn";
  const phone = form.phone.value.trim() || "未填写联系电话";

  return {
    name,
    ageLabel: age === null ? "生日待完善" : `${age} 岁`,
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
  const lines = getWrappedLines(context, text, maxWidth, maxLines);

  lines.forEach((line, index) => {
    context.fillText(line, x, y + index * lineHeight);
  });

  return y + (lines.length - 1) * lineHeight;
}

function getWrappedLines(context, text, maxWidth, maxLines = 2) {
  const content = text || "待完善信息";
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

  return visibleLines;
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
  return `${safeName || "student-card"}-名片.png`;
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
      "当前设备支持系统分享，点击保存后会优先调起系统分享面板，可直接存入相册或发送到文件。";
    return;
  }

  if (isMobile) {
    cardMakerHint.textContent =
      "部分手机浏览器无法直接写入系统相册，点击保存后会下载 PNG 到系统目录，可在相册或文件中查看。";
    return;
  }

  if ("showSaveFilePicker" in window) {
    cardMakerHint.textContent =
      "当前浏览器支持自选保存位置，点击保存后会弹出路径选择。";
    return;
  }

  cardMakerHint.textContent = "当前浏览器将直接下载 PNG 到默认下载目录。";
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
  fillRoundedRect(context, 86, 430, width - 172, 650, 40, template.panelStrong);
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
  context.fillText("信息名片", 126, 548);

  context.fillStyle = template.textSecondary;
  const metaRows = [
    profile.department,
    `${profile.major} · ${profile.className}`,
  ];
  let metaY = 604;

  metaRows.forEach((row) => {
    context.font = getFittedFont(
      context,
      row,
      30,
      22,
      width - 252,
      "Outfit, Microsoft YaHei, sans-serif",
      500,
    );
    const rowLines = getWrappedLines(context, row, width - 252, 2);
    rowLines.forEach((line, index) => {
      context.fillText(line, 126, metaY + index * 36);
    });
    metaY += rowLines.length * 36 + 14;
  });

  const infoBlocks = [
    { label: "学号", value: profile.studentId },
    { label: "联系电话", value: profile.phone },
    { label: "电子邮箱", value: profile.email },
  ];

  infoBlocks.forEach((item, index) => {
    const top = metaY + 24 + index * 112;
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
        reject(new Error("名片生成失败"));
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
    downloadCardBtn.textContent = "正在生成...";
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
            title: "学生注册名片",
            text: "这是根据当前资料自动生成的名片图片。",
          });
          showMessage("名片图片已调起系统分享。", true);
          return;
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            triggerCardDownload(blob, fileName);
            showMessage("系统分享不可用，已改为下载名片图片。", true);
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
              description: "PNG 图片",
              accept: {
                "image/png": [".png"],
              },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        showMessage("名片图片已保存到你选择的位置。", true);
        return;
      } catch (error) {
        if (!(error instanceof Error) || error.name !== "AbortError") {
          triggerCardDownload(blob, fileName);
          showMessage("当前浏览器未完成路径保存，已改为下载名片图片。", true);
          return;
        }
        return;
      }
    }

    triggerCardDownload(blob, fileName);
    showMessage(
      isMobileGalleryLayout()
        ? "名片图片已开始下载，可在系统相册或文件中查看。"
        : "名片图片已下载到默认目录。",
      true,
    );
  } catch {
    showMessage("名片生成失败，请稍后重试。", false);
  } finally {
    downloadCardBtn.disabled = false;
    downloadCardBtn.textContent = "保存名片图片";
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
    progressNote.textContent = "信息已填写完整，可以提交。";
    submitBtn.disabled = false;
    submitBtn.textContent = "提交注册信息";
    return;
  }

  progressNote.textContent = `已完成 ${completed} / ${total} 项关键信息。`;
  submitBtn.disabled = true;
  submitBtn.textContent = "请先完成填写";
}

function getSelectedGender() {
  const checked = form.querySelector("input[name='gender']:checked");
  return checked ? checked.value : "未选择性别";
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
  const name = form.studentName.value.trim() || "请输入你的姓名";
  const email = form.email.value.trim() || "example@student.edu.cn";
  const phone = form.phone.value.trim() || "未填写";
  const major = form.major.value.trim();
  const className = form.className.value.trim();
  const department = form.department.value || "待完善信息";
  const age = calculateAge(form.birthday.value);
  const metaParts = [getSelectedGender(), department];

  if (major) {
    metaParts.push(major);
  }

  if (className) {
    metaParts.push(className);
  }

  previewBindings.studentName.textContent = name;
  previewBindings.age.textContent = age === null ? "未填写生日" : `${age} 岁`;
  previewBindings.email.textContent = email;
  previewBindings.phone.textContent = phone;
  document.getElementById("cardMeta").textContent = metaParts.join(" · ");
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
    "密码长度不少于8位，建议包含字母、数字和符号。",
    "当前强度较弱，建议增加位数和字符种类。",
    "当前强度一般，可再加入大小写或特殊符号。",
    "当前强度良好，已具备较好的安全性。",
    "当前强度很高，可以放心使用。",
  ];

  passwordHint.textContent = hints[score];
}

function updateConfirmPasswordHint() {
  const confirmPassword = confirmPasswordInput.value;
  const password = passwordInput.value;

  if (!confirmPassword) {
    confirmPasswordHint.textContent = "请再次输入与登录密码一致的内容。";
    confirmPasswordField.classList.remove("is-success");
    return;
  }

  if (confirmPassword === password) {
    confirmPasswordHint.textContent = "两次输入一致。";
    confirmPasswordField.classList.add("is-success");
    return;
  }

  confirmPasswordHint.textContent = "两次输入的密码需保持一致。";
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

  uploadTitle.textContent = "照片上传完成";
  uploadDescription.textContent = `当前文件：${file.name}`;
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
    passwordHint.textContent = "密码长度不少于8位，建议包含字母、数字和符号。";
    confirmPasswordHint.textContent = "请再次输入与登录密码一致的内容。";
    confirmPasswordField.classList.remove("is-success");
    updateUploadState(null);
    document
      .querySelectorAll(".invalid")
      .forEach((node) => node.classList.remove("invalid"));
    showMessage("表单已重置，请重新填写信息。", true);
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
  showMessage("本地草稿已清除。", true);
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
    showMessage("两次输入的密码不一致，请检查后重新提交。", false);
    return;
  }

  if (!validInputs || !validGender) {
    showMessage("请先完整并正确填写所有必填信息。", false);
    return;
  }

  showMessage("注册信息提交成功，当前页面可直接作为实验成果展示。", true);
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
