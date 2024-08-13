// for whole document
document.addEventListener('DOMContentLoaded', () => {
    // screen size to set the width according to current size of the screen
    const mainContainer = document.querySelector('.main-container');
  
    function updateScreenSize() {
      let widthContainer = window.innerWidth;
      mainContainer.style.maxWidth = `${widthContainer}px`;
    }
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();
  });

// table
document.addEventListener('DOMContentLoaded', () => {
    //for dropdown status color
    const selectElements = document.querySelectorAll('.booking-status');
  
    selectElements.forEach(function (selectElement) {
      selectElement.addEventListener('change', function () {
        const selectedValue = this.value;
        switch (selectedValue) {
          case 'booked':
            this.style.color = 'green';
            break;
          case 'pending':
            this.style.color = 'orange';
            break;
          case 'canceled':
            this.style.color = 'red';
            break;
          case 'checkIn':
            this.style.color = 'blue';
            break;
          case 'checkOut':
            this.style.color = 'gray';
            break;
        }
      });
      selectElement.dispatchEvent(new Event('change'));
    });
  
    // another drop down for booking ref no that will direct to payment or penalty
    const pTags = document.querySelectorAll('td.booking-no p');
  
    pTags.forEach(pTag => {
      pTag.addEventListener('mouseover', () => {
        const dropdown = pTag.nextElementSibling;
        dropdown.style.display = 'flex';
      });
  
      pTag.addEventListener('mouseout', () => {
        const dropdown = pTag.nextElementSibling;
        dropdown.style.display = 'none';
      });
  
      const dropdown = pTag.nextElementSibling;
      dropdown.addEventListener('mouseover', () => {
        dropdown.style.display = 'flex';
      });
  
      dropdown.addEventListener('mouseout', () => {
        dropdown.style.display = 'none';
      });
  
      const dropdownLinks = dropdown.querySelectorAll('a');
      dropdownLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
          dropdown.style.display = 'flex';
        });
  
        link.addEventListener('mouseout', () => {
  
        });
      });
    });
  });