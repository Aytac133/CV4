// 1. Əlaqə məlumatını gizlət/göstər funksiyası
function toggleContact() {
  const contactDiv = document.querySelector('.contact');
  const contactInfo = contactDiv.querySelectorAll('p'); // yalnız məlumatları seçir

  contactInfo.forEach(p => {
    p.style.display = (p.style.display === 'none' || window.getComputedStyle(p).display === 'none')
      ? 'block'
      : 'none';
  });
}

// 2. Dillərdə axtarış funksiyası
function filterLanguages() {
  const input = document.getElementById('languageSearch').value.toLowerCase();
  const languages = document.querySelectorAll('.languages p');

  languages.forEach(lang => {
    if (lang.textContent.toLowerCase().includes(input)) {
      lang.style.display = 'block';
    } else {
      lang.style.display = 'none';
    }
  });
}

function toggleTechnical() {
  const techSection = document.querySelector('.reference');
  const techInfo = techSection.querySelectorAll('p');
  const button = techSection.querySelector('button');

  const isHidden = Array.from(techInfo).every(p => window.getComputedStyle(p).display === 'none');

  techInfo.forEach(p => {
    p.style.display = isHidden ? 'block' : 'none';
  });

  button.textContent = isHidden ? 'Gizlət' : 'Göstər';
}


function toggleEducation() {
  const educationSection = document.querySelector('.education');
  const educationInfo = educationSection.querySelectorAll('p');
  const button = educationSection.querySelector('button');

  const isHidden = Array.from(educationInfo).every(p => window.getComputedStyle(p).display === 'none');

  educationInfo.forEach(p => {
    p.style.display = isHidden ? 'block' : 'none';
  });

  button.textContent = isHidden ? 'Gizlət' : 'Göstər';
}

function toggleSkills() {
  const skillsSection = document.querySelector('.skills');
  const skillsInfo = skillsSection.querySelectorAll('li');
  const button = skillsSection.querySelector('button');

  const isHidden = Array.from(skillsInfo).every(li => window.getComputedStyle(li).display === 'none');

  skillsInfo.forEach(li => {
    li.style.display = isHidden ? 'block' : 'none';
  });

  button.textContent = isHidden ? 'Gizlət' : 'Göstər';
}

function toggleLanguages() {
  const langSection = document.querySelector('.languages');
  const langParagraphs = langSection.querySelectorAll('p');
  const button = langSection.querySelector('button');

  const isHidden = Array.from(langParagraphs).every(p => window.getComputedStyle(p).display === 'none');

  langParagraphs.forEach(p => {
    p.style.display = isHidden ? 'block' : 'none';
  });

  button.textContent = isHidden ? 'Gizlət' : 'Göstər';
}

function enableEditing() {
  const editableElements = document.querySelectorAll('.sidebar p, .sidebar li, .content p');
  editableElements.forEach(el => {
    el.setAttribute('contenteditable', 'true');
    el.classList.add('editable');
  });

  // Enter basılarsa və ya fokus itərsə, avtomatik yadda saxla + yoxla
  editableElements.forEach(el => {
    el.addEventListener('blur', validateAndSave); // fokus itəndə yoxla və saxla
  });
}

function disableEditing() {
  const elements = document.querySelectorAll('.editable');
  elements.forEach(function(element) {
      element.contentEditable = false;  // Elementin redaktəsini dayandırır
      element.style.border = 'none';  // Sərhədi silir
  });
}

function saveToLocalStorage() {
  const editableElements = document.querySelectorAll('.sidebar p, .sidebar li, .content p');
  const data = [];

  editableElements.forEach((el, index) => {
    data.push({ index, content: el.innerText });
  });

  localStorage.setItem('cvData', JSON.stringify(data));
  alert('Məlumat yadda saxlanıldı!');
}

window.addEventListener('DOMContentLoaded', () => {
  const storedData = JSON.parse(localStorage.getItem('cvData'));
  if (storedData) {
    const editableElements = document.querySelectorAll('.sidebar p, .sidebar li, .content p');
    storedData.forEach((item, i) => {
      if (editableElements[i]) {
        editableElements[i].innerText = item.content;
      }
    });
  }
});

function validateAndSave() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  const editableElements = document.querySelectorAll('.sidebar p, .sidebar li, .content p');

  editableElements.forEach(el => {
    el.style.border = 'none'; // əvvəlki xəta sərhədini sil
    const text = el.innerText.trim();

    if (!text) {
      el.style.border = '2px solid red';
      isValid = false;
    }

    if (text.includes('@') && !emailRegex.test(text)) {
      el.style.border = '2px solid red';
      isValid = false;
    }
  });

  if (isValid) {
    saveToLocalStorage();
  } else {
    alert("Zəhmət olmasa, bütün sahələri düzgün doldurun.");
  }
}

