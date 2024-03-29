(()=>{"use strict";function t(n){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(n)}function n(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,o=new Array(n);e<n;e++)o[e]=t[e];return o}function e(t){var n="function"==typeof Map?new Map:void 0;return e=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(n){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(t))return n.get(t);n.set(t,e)}function e(){return function(t,n,e){if(o())return Reflect.construct.apply(null,arguments);var c=[null];c.push.apply(c,n);var i=new(t.bind.apply(t,c));return e&&r(i,e.prototype),i}(t,arguments,c(this).constructor)}return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r(e,t)},e(t)}function o(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(o=function(){return!!t})()}function r(t,n){return r=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,n){return t.__proto__=n,t},r(t,n)}function c(t){return c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},c(t)}var i=function(n){function e(n){var r,i,a,u;return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),(i=this,a=e,u=[n],a=c(a),r=function(n,e){if(e&&("object"===t(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(n)}(i,o()?Reflect.construct(a,u||[],c(i).constructor):a.apply(i,u))).name="NoBooksFound",r}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),n&&r(t,n)}(e,n),i=e,Object.defineProperty(i,"prototype",{writable:!1}),i;var i}(e(Error));function a(t,e){fetch("https://openlibrary.org{bookKey}.json").then((function(t){return t.json()})).then((function(o){var r,c=o.title?o.title:"Title not available",i=null!=o&&o.description?o.description:"Description not available";"Description not available"!=i&&null!==(r=i)&&void 0!==r&&r.value&&(i=i.value);var a=document.querySelector('[data-book-key="'.concat(t,'"] .card-body'));(function(t){var e,o=function(t,e){var o="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!o){if(Array.isArray(t)||(o=function(t,e){if(t){if("string"==typeof t)return n(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?n(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){o&&(t=o);var r=0,c=function(){};return{s:c,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){o=o.call(t)},n:function(){var t=o.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==o.return||o.return()}finally{if(u)throw i}}}}(t);try{for(o.s();!(e=o.n()).done;)if("'"==e.value)return!0}catch(t){o.e(t)}finally{o.f()}return!1})(c)&&(c=c.replace(/'/g,"\\'")),a.innerHTML='\n                <h5 class="card-title text-center">'.concat(c.replace("\\'","'"),'</h5>\n                <p class="card-text">').concat(i,'</p>\n                <button type="button" class="btn-close" aria-label="Close" onclick="closeDescription(\'').concat(t,"','").concat(c,"','").concat(e,"')\"></button>\n            ")})).catch((function(t){return console.error("Error fetching book description:",t)}))}document.getElementById("loadingSpinner").style.display="none",window.searchBooks=function(t){console.log(),t.preventDefault();var n=document.getElementById("errorMessage");n.innerHTML="";var e=document.getElementById("loadingSpinner");e.style.display="block";var o=document.getElementById("genere").value.toLowerCase();fetch("https://openlibrary.org/subjects/"+"".concat(o,".json")).then((function(t){return t.json()})).then((function(t){e.style.display="none";var n=t.works;if(0===n.length)throw new i("No books found");var o=document.getElementById("booksList");o.innerHTML="",n.forEach((function(t){var n=t.title?t.title:"Title not available",e=""!=t.authors?t.authors.map((function(t){return t.name})).join(", "):"Author not available",r=document.createElement("div");r.classList.add("col"),r.innerHTML='\n                <div class="card shadow-sm mt-2 mb-2" data-book-key="'.concat(t.key,'">\n                    <div class="card-body">\n                        <h5 class="card-title">').concat(n,'</h5>\n                        <p class="card-text">Authors: ').concat(e,'</p>\n                        <button class="btn btn-primary" onclick="showDescription(\'').concat(t.key,"', '").concat(e,"')\">Show Description</button>\n                    </div>\n                </div>\n            "),o.appendChild(r)}))})).catch((function(t){console.error("Error fetching books:",t),e.style.display="none",booksList.innerHTML="",n.innerHTML="No books found.<br>Please try a different search term."}))},window.NoBooksFound=i,window.showDescription=a,window.closeDescription=function(t,n,e){var o=document.querySelector('[data-book-key="'.concat(t,'"] .card-body'));o.innerHTML="";var r=document.createElement("h5");r.classList.add("card-title"),r.textContent=n;var c=document.createElement("p");c.classList.add("card-text"),c.textContent="Author: "+e;var i=document.createElement("button");i.classList.add("btn","btn-primary"),i.textContent="Show Description",i.addEventListener("click",(function(){a(t,e)})),o.appendChild(r),o.appendChild(c),o.appendChild(i)}})();