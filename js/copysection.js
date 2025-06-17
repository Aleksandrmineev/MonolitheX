document.addEventListener('DOMContentLoaded', () => {
  const template = document.getElementById('form-template');

  const insert1 = document.getElementById('insert-form-section-1');
  const insert2 = document.getElementById('insert-form-section-2');

  if (template) {
    if (insert1) {
      const clone1 = template.content.cloneNode(true);
      insert1.appendChild(clone1);
    }

    if (insert2) {
      const clone2 = template.content.cloneNode(true);
      insert2.appendChild(clone2);
    }
  }
});
