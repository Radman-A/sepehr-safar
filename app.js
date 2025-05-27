const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector("section");
const image_container = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();
    
    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);
    })

    big_title.style.opacity = - scroll / (header_height / 2) + 1;
    shadow.style.height = `${scroll * 0.5 + 300}px`;
    
    let borderWidth = scroll / (sectionY.top + section_height) * 100;
    borderWidth = Math.min(borderWidth, 100);  // Ensure borderWidth doesn't exceed 100%
    border.style.width = `${borderWidth}%`;
})

const data = [
    {
        دی: [
            {
                img: "./assets/2.jpg",
                h1: "سفر به پیست‌های اسکی دیزین",
                copy: "یک تجربه هیجان‌انگیز در ارتفاعات برفی دیزین همراه با امکانات عالی و طبیعت زیبا.",
                linkLabel: "بیشتر بدانید",
                linkSrc: "https://example.com/dizin-ski-resort",
            },
            {
                img: "./assets/4.jpg",
                h1: "گردشگری تاریخی در اصفهان",
                copy: "کشف زیبایی‌های فرهنگی و تاریخی اصفهان با بازدید از میدان نقش جهان و پل خواجو.",
                linkLabel: "برنامه سفر",
                linkSrc: "https://example.com/esfahan-historical-tour",
            }
        ]
    },
    {
        بهمن: [
            {
                img: "./assets/1.jpg",
                h1: "کویرگردی در مرنجاب",
                copy: "ماجراجویی در شن‌های طلایی مرنجاب همراه با کمپینگ زیر آسمان پرستاره.",
                linkLabel: "رزرو کنید",
                linkSrc: "https://example.com/maranjab-desert-tour",
            },
            {
                img: "./assets/3.jpg",
                h1: "گردش در جنگل‌های گیلان",
                copy: "پیاده‌روی در طبیعت سرسبز و زیبای جنگل‌های گیلان همراه با هوای دلپذیر زمستانی.",
                linkLabel: "جزئیات بیشتر",
                linkSrc: "https://example.com/gilan-nature-tour",
            },
            {
                img: "./assets/6.jpg",
                h1: "جشنواره‌های زمستانی تبریز",
                copy: "شرکت در جشنواره‌های فرهنگی و زمستانی تبریز همراه با طعم غذاهای محلی.",
                linkLabel: "اطلاعات بیشتر",
                linkSrc: "https://example.com/tabriz-winter-festival",
            }
        ]
    },
    {
        اسفند: [
            {
                img: "./assets/5.jpg",
                h1: "کمپ زمستانی در کردستان",
                copy: "تجربه‌ای خاص از اقامت در کمپ‌های زمستانی و آشنایی با فرهنگ محلی کردستان.",
                linkLabel: "رزرو تور",
                linkSrc: "https://example.com/kurdistan-winter-camp",
            }
        ]
    }
];
    document.addEventListener("DOMContentLoaded", () => {
      const activeColors = ["#5fa5f9", "#e879f9", "#a78bfa"];

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };

      const generatePads = (card, activePadCount, items) => {
        const rowsConfig = [7, 7, 7, 7, 2];
        const clickablePads = [];

        rowsConfig.forEach((padCount, rowIndex) => {
          const row = document.createElement("div");
          row.classList.add("row");
          for (let i = 0; i < padCount; i++) {
            const pad = document.createElement("div");
            pad.classList.add("pad");
            row.appendChild(pad);
            if (rowIndex !== 0 && rowIndex !== rowsConfig.length - 1) {
              clickablePads.push(pad);
            }
          }
          card.appendChild(row);
        });

        shuffleArray(clickablePads);
        setActivePads(clickablePads, card, activePadCount, items);
      };

      const setActivePads = (clickablePads, card, activePadCount, items) => {
        clickablePads.slice(0, activePadCount).forEach((pad, i) => {
          pad.classList.add("active");
          pad.style.backgroundColor =
            activeColors[Math.floor(Math.random() * activeColors.length)];
          pad.addEventListener("click", () => {
            clickablePads.forEach((p) => (p.style.zIndex = "0"));
            pad.style.zIndex = "1";

            const item = items[i];
            const cardContent = card.querySelector(".card-content");
            cardContent.innerHTML = `
              <button class="button1">برگشت</button>
              <div class="card-item img">
                <img src="${item.img}" alt="" />
              </div>
              <div class="card-item copy">
                <h1>${item.h1}</h1>
                <p>${item.copy}</p>
              </div>
              <div class="card-item copy link">
                <a href="${item.linkSrc}" class="btnc">${item.linkLabel}</a>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
            `;

            gsap.to(pad, {
              scale: 20,
              duration: 0.3,
              onComplete: () => {
                gsap.to(cardContent, {
                  opacity: 1,
                  pointerEvents: "all",
                  duration: 0.075,
                  onComplete: () => {
                    const backButton = cardContent.querySelector("button");
                    if (backButton) {
                      backButton.addEventListener("click", () => {
                        gsap.to(cardContent, {
                          opacity: 0,
                          pointerEvents: "none",
                          duration: 0.2,
                          onComplete: () => {
                            gsap.to(pad, {
                              scale: 1,
                              duration: 0.3,
                              onComplete: () => {
                                pad.style.zIndex = "0";
                                cardContent.style.opacity = "0";
                                cardContent.style.pointerEvents = "none";
                                gsap.set(cardContent.querySelectorAll(".card-item"), {
                                  clearProps: "all",
                                });
                              },
                            });
                          },
                        });
                      });
                    }
                  },
                });
                gsap.fromTo(
                  cardContent.querySelectorAll(".card-item"),
                  {
                    y: 100,
                    rotation: () => gsap.utils.random(-30, 30),
                    opacity: 0,
                  },
                  {
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    duration: 2,
                    ease: "elastic.out",
                    stagger: 0.1,
                  }
                );
              },
            });
          });
        });
      };

      const container = document.querySelector(".container23");
      data.forEach((monthData) => {
        const month = Object.keys(monthData)[0];
        const items = monthData[month];

        const card = document.createElement("div");
        card.classList.add("card");

        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        cardTitle.innerHTML = `<p>${month}</p>`;
        card.appendChild(cardTitle);

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        cardContent.style.opacity = "0";
        cardContent.style.pointerEvents = "none";
        card.appendChild(cardContent);

        generatePads(card, items.length, items);
        container.appendChild(card);
      });
    });

(function() {
    const MENU_SELECTOR = '.menu';
    const GALLERY_ID = 'menu-gallery-item';

    function updateGalleryItem() {
        const menu = document.querySelector(MENU_SELECTOR);
        if (!menu) return;

        const exists = !!document.getElementById(GALLERY_ID);

        if (window.innerWidth > 1000 && !exists) {
            // Create and append the gallery item
            const li = document.createElement('li');
            li.className = 'menu__item';
            li.id = GALLERY_ID;

            const a = document.createElement('a');
            a.className = 'menu__link';
            a.href = 'gallery.html';
            a.textContent = 'گالری';

            li.appendChild(a);
            menu.appendChild(li);

        } else if (window.innerWidth <= 1000 && exists) {
            // Remove it if we shrink below threshold
            const li = document.getElementById(GALLERY_ID);
            li && li.parentNode.removeChild(li);
        }
    }

    // On initial load
    document.addEventListener('DOMContentLoaded', updateGalleryItem);

    // Optional: on resize, re-evaluate
    window.addEventListener('resize', updateGalleryItem);
})();
