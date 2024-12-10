# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Screenshot

![screenshot mobile](https://github.com/Lo-Deck/Job-listings-with-filtering/blob/main/screenshot/Job%20Listings-mobile.png).
![screenshot desktop](https://github.com/Lo-Deck/Job-listings-with-filtering/blob/main/screenshot/Job%20Listings-desktop.png).
![screenshot desktop-filter](https://github.com/Lo-Deck/Job-listings-with-filtering/blob/main/screenshot/Job%20Listings-desktop-filter.png).

### Links

- Solution URL: [Repositories](https://github.com/Lo-Deck/Job-listings-with-filtering).
- Live Site URL: [Website](https://lo-deck.github.io/Job-listings-with-filtering/).


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow


### What I learned

I learned how to fetch data in JSON file, and use this data to create some element with HTML using `document.querySelector('.main-container').insertAdjacentElement('beforeend', element);`


I learned how to sort different item and display them, I've used a loop `for...in` and `.includes()`.  

```js

for(const key in element.dataset){

    if(keyBtn === key){

      const array = element.dataset[key].split(','); // split up different value

      if(!array.includes(valueBtn)){

         element.classList.add('hidden');

      }

   }

}

```

Sort item with a clear button

```js

for(const sectionKey in document.querySelector('.tag-selected').dataset){

   if( element.dataset.hasOwnProperty(sectionKey) ){

      const array = element.dataset[sectionKey].split(',');

      if(array.includes(document.querySelector('.tag-selected').dataset[sectionKey])){
         isDisplay = true;
      }

      else{
         isDisplay = false;
         break;
      }

  }

}

```


### Continued development

Learning from each challenge, I will continue to make website with JS and learning from different challenge from Front-end Mentor.


### Useful resources

- [Mozilla mdn](https://developer.mozilla.org/) - Very useful.
- [FreeCodeCamp](https://www.freecodecamp.org/) - I've been learning a lot.


## Author

- Frontend Mentor - [@Lo-deck](https://www.frontendmentor.io/profile/Lo-Deck)


## Acknowledgments

Thanks to Front-end Mentor and its community.
