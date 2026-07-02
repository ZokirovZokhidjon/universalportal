import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCO079n6tlKKTXi1LjtSB1t0ddsxDMQUW4",
  authDomain: "universal-portal-108b7.firebaseapp.com",
  databaseURL: "https://universal-portal-108b7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "universal-portal-108b7",
  storageBucket: "universal-portal-108b7.firebasestorage.app",
  messagingSenderId: "183555008981",
  appId: "1:183555008981:web:b38e59baef1d6861b6b55c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Саҳифа номини аниқлаш
const path = window.location.pathname;
let pageName = path.split("/").pop().split(".")[0]; 

// Агар Гитҳабда линк муаммо бўлса ёки бўш бўлса, хавфсизлик учун текширув:
if (!pageName || pageName === "index") {
    pageName = "index"; 
}

// ДИҚҚАТ: Агар админ панелдан мақола юборганда категорияга "Табобат" деб ёзаётган бўлсангиз,
// пастдаги кодни фаоллаштиринг (иккита чизиқни олиб ташланг):
// if (pageName === "med") pageName = "Табобат";

const container = document.getElementById('post-display-area');
const sidebar = document.getElementById('sidebar-links');

// Базадан филтрлаб олиш
const postsRef = query(ref(db, 'all_posts'), orderByChild('category'), equalTo(pageName));

onValue(postsRef, (snapshot) => {
  if (container) container.innerHTML = ''; 
  if (sidebar) sidebar.innerHTML = '';

  const data = snapshot.val();
  if (data) {
    const entries = Object.entries(data).reverse();
    
    entries.forEach(([key, post]) => {
      if (container) {
        container.innerHTML += `
          <article class="post-card">
            ${post.image ? `<img src="${post.image}" alt="img">` : ''}
            <div class="post-body">
              <h2>${post.title}</h2>
              <p style="font-size:13px; color:#888;">📅 ${post.time || ''}</p>
              <p>${post.content}</p>
              ${post.video ? `<div class="video-box">${post.video}</div>` : ''}
            </div>
          </article>
        `;
      }

      if (sidebar) {
        sidebar.innerHTML += `<li><a href="#">➔ ${post.title}</a></li>`;
      }
    });
  } else {
    if (container) {
        // Консолга чиқариб кўрамиз, база айнан қайси сўз билан қидиряпти
        console.log("Қидирилган категория:", pageName);
        container.innerHTML = `<p style="text-align:center; color:#7f8c8d;">"${pageName}" рукнида ҳозирча мақолалар йўқ.</p>`;
    }
  }
});