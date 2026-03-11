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
let galleryStartIndex = 0;
let galleryTimerId = null;
let isGalleryAnimating = false;
const galleryOutDuration = 420;
const galleryInDuration = 640;

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
  galleryCards.forEach((card, index) => {
    const item =
      galleryItems[(galleryStartIndex + index) % galleryItems.length];
    const image = card.querySelector(".gallery-image");
    const eyebrow = card.querySelector(".gallery-overlay p");
    const title = card.querySelector(".gallery-overlay h3");

    image.src = item.src;
    image.alt = item.alt;
    image.style.objectPosition = item.objectPosition;
    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;

    card.classList.toggle("gallery-card--exit", index === 0);
    card.classList.toggle("gallery-card--enter", index === 2);
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
    } else {
      if (movingLeft) {
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
  animateGalleryPhase(direction, "out");

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
    }, galleryInDuration);
  }, galleryOutDuration);
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
  rotateGallery(-1);
  restartGalleryTimer();
});

galleryNextBtn.addEventListener("click", () => {
  rotateGallery(1);
  restartGalleryTimer();
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
