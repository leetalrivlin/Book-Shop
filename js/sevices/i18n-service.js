'use strict';
var gCurrLang = 'en';

var gTrans = {
    'main-title': {
        en: 'My Book Shop',
        he: 'חנות הספרים שלי'
    },
    'book-name-placeholder': {
        en: 'Book name (e.g: The Little Prince)',
        he: 'שם הספר (למשל: הנסיך הקטן)'
    },
    'book-price-placeholder': {
        en: 'Book price (e.g: 35)',
        he: 'מחיר הספר בדולרים (למשל: 80)'
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוסף'
    },
    'id': {
        en: 'ID',
        he: 'אינדקס'
    },
    'title': {
        en: 'Title',
        he: 'שם הספר'
    },
    'price': {
        en: 'Price',
        he: 'מחיר'
    },
    'rating': {
        en: 'Rating',
        he: 'דירוג'
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'read': {
        en: 'Read',
        he: 'קרא'
    },
    'update': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete': {
        en: 'Delete',
        he: 'מחק'
    },
    'raiting-title': {
        en: 'Add your rating (0-10)',
        he: 'הוסף דירוג'
    },
    'rate': {
        en: 'Rate!',
        he: 'דרג'
    },
    'confirm': {
        en: 'Are you sure you want to delete this book?',
        he: 'בטוח שאתם מעוניינים למחוק ספר זה?'
    },
    'update-prompt': {
        en: 'Enter new price',
        he: 'המחיר העדכני של הספר'
    },
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];

    // if not found return en
    if (!txt) txt = keyTrans['en'];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatCurrency(num) {
    if (gCurrLang === 'he') {
    var currChangeIlsRate = 3.3;
    num *= currChangeIlsRate;
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    } else if (gCurrLang === 'en') {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(num);
    }
}