document.addEventListener("DOMContentLoaded", () => {
    
    // Sabhi elements ko select kar rahe hain
    const lightSwitch = document.getElementById("light-switch");
    const darkRoom = document.getElementById("dark-room");
    const mainContent = document.getElementById("main-content");
    const mascot = document.getElementById("mascot");
    const dialogue = document.querySelector(".mascot-dialogue");
    const giftBox = document.getElementById("giftBox");
    const flames = [document.querySelector(".flame-1"), document.querySelector(".flame-2")];
    const polaroidGallery = document.getElementById("polaroid-gallery");
    const polaroids = document.querySelectorAll(".polaroid");
    
    let isGiftOpened = false;
    let candyInterval; // Candies ko rokne ke liye variable

    // ==========================================
    // 1. LIGHT SWITCH LOGIC (Dark room se bahar aana)
    // ==========================================
    lightSwitch.addEventListener("click", () => {
        darkRoom.style.opacity = "0";
        setTimeout(() => {
            darkRoom.style.display = "none";
            mainContent.style.opacity = "1";
            
            // Mascot (Teddy) Walk in Animation
            setTimeout(() => {
                mascot.style.transform = "translateX(200px)"; // Center ke paas laane ke liye
                setTimeout(() => {
                    dialogue.style.opacity = "1"; 
                }, 1000);
            }, 500);
        }, 1500);
    });

    // ==========================================
    // 2. CANDLES BLOW OUT LOGIC
    // ==========================================
    flames.forEach(flame => {
        if(flame) {
            flame.addEventListener("click", function() {
                this.style.transition = "opacity 0.5s ease";
                this.style.opacity = "0"; // Click karte hi aag bujh jayegi
            });
        }
    });

    // ==========================================
    // 3. GIFT BOX TOGGLE LOGIC (Khulna aur Band hona)
    // ==========================================
    giftBox.addEventListener("click", () => {
        if (!isGiftOpened) {
            // Box Kholne ka logic
            isGiftOpened = true;
            giftBox.classList.add("open"); // CSS animation trigger karne ke liye
            
            // Confetti Blast (Sirf jab khule tab)
            if(typeof confetti === 'function') {
                confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            }

            startFallingCandies();
            showPolaroids();
            dialogue.innerHTML = "Wow! Enjoy your day! 🎉<br><span style='font-size:12px'>(Click again to close)</span>";
            
        } else {
            // Box Band karne ka logic
            isGiftOpened = false;
            giftBox.classList.remove("open"); // Box wapas band hoga
            
            hidePolaroids();
            dialogue.innerHTML = "Happy Birthday Ankita! <br> Click the gift box! 🎁";
            
            // Agar pehle wali candies chal rahi hain toh unhe turant rok do
            clearInterval(candyInterval); 
        }
    });

    // ==========================================
    // 4. FALLING CANDIES LOGIC (5 Second Limit)
    // ==========================================
    function startFallingCandies() {
        // Puraani koi interval chal rahi ho toh use rok do
        clearInterval(candyInterval);
        
        const candiesArr = ['🍬', '🍫', '🍭'];
        
        // Har 250ms me ek nayi chocolate banegi
        candyInterval = setInterval(() => {
            const candy = document.createElement("div");
            candy.classList.add("candy");
            candy.innerText = candiesArr[Math.floor(Math.random() * candiesArr.length)];
            candy.style.left = Math.random() * 90 + "vw"; // Screen width ke andar
            document.body.appendChild(candy);

            let top = -50;
            // Har chocolate ko neeche girane ka loop
            const fall = setInterval(() => {
                top += 4; // Girne ki speed
                candy.style.top = top + "px";
                
                // Jab screen ke neeche chali jaye toh delete kar do taaki lag na ho
                if (top > window.innerHeight) {
                    clearInterval(fall);
                    candy.remove();
                }
            }, 20);
        }, 250);

        // Nayi Candies aana 5 second (5000ms) baad band ho jayega
        setTimeout(() => {
            clearInterval(candyInterval);
        }, 5000); 
    }

    // ==========================================
    // 5. POLAROID GALLERY LOGIC
    // ==========================================
    const transforms = [
        "translate(-150%, -120%) rotate(-15deg)", // Photo 1 Left me
        "translate(50%, -150%) rotate(10deg)",  // Photo 2 Right me upar
        "translate(-50%, 30%) rotate(-5deg)"    // Photo 3 Center me thoda neeche
    ];

    function showPolaroids() {
        polaroidGallery.classList.remove("hidden");
        
        polaroids.forEach((p, index) => {
            setTimeout(() => {
                p.style.opacity = "1";
                p.style.transform = transforms[index];
                p.style.zIndex = 30 + index;
            }, index * 400); // Ek-ek karke ayengi
        });
    }

    function hidePolaroids() {
        polaroids.forEach((p) => {
            p.style.opacity = "0";
            p.style.transform = "translate(-50%, -50%) scale(0.1)"; // Wapas choti ho jayengi
            p.style.zIndex = "-1";
        });
        setTimeout(() => {
            polaroidGallery.classList.add("hidden");
        }, 500); // Animation khatam hone ke baad hide karenge
    }
});
