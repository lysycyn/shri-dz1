require('./styles/fonts.css');
require('./styles/header.css');
require('./styles/main.css');
require('./styles/post.css');

const descr_lengths = {
    s: 150,
    m: 160,
    l: 180,
};
const title_lengths = {
    s: 50,
    m: 80,
    l: 50,
};

const data = require('./data.js');
const container = document.querySelector('.js-content');
const template = document.querySelector('#js-post-template');

const setHeightSocials = social => {};

data.default.map(row => {
    const post = document.importNode(template.content, true);

    post.querySelector('.post').classList.add(`post_size_${row.size}`);
    const title = post.querySelector('.post__title');
    if (row.title.length > title_lengths[row.size]) {
        title.textContent = row.title.slice(0, title_lengths[row.size]) + '...';
    } else {
        title.textContent = row.title;
    }

    title.style.color = row.titleColor;
    if (row.image) {
        const imgBlock = post.querySelector('.post__img');
        const img = document.createElement('img');
        img.setAttribute('srcset', `${row.image2x} 800w, ${row.image3x} 1200w`);
        img.setAttribute('src', row.image);
        imgBlock.appendChild(img);
    } else {
        post.querySelector('.post').classList.add('post_no-image');
        post.querySelector('.post__author').textContent = row.channelName;
    }

    const descr = post.querySelector('.post__descr');
    if (row.description && row.description.length > descr_lengths[row.size]) {
        descr.textContent = row.description.slice(0, descr_lengths[row.size]) + '...';
    } else {
        descr.textContent = row.description;
    }

    container.appendChild(post);
});
