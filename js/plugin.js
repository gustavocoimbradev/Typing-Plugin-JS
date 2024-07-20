/**
 * @name: TypingJS
 * @version: v1.0.0
 * @author: Gustavo Coimbra
 *
 * Created by Gustavo Coimbra on 2024-01-24. Please report any bug at https://github.com/gustavocoimbradev/typingjs
 * 
 * Documentation https://typingjs.vercel.app
 *
 * Copyright (c) 2024 Gustavo Coimbra https://gustavocoimbra.vercel.app
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/


const TypingJS = ({ 
    selector,
    typingTime = 40,
    sleepingTime = 2000,
    deletingTime = 25,
    typingLoop = true
}) => {
    
    const typingElements = document.querySelectorAll(selector);

    typingElements.forEach(function(single){
        single.classList.add('typingjs-initialized');
    })

    const checkHTML = () => {
        typingElements.forEach(element => {
            const typingTexts = Array.from(element.children);
            if (typingTexts.length === 0) {
                element.remove();
            } else {
                typingTexts.forEach(text => {
                    if (!text.getAttribute('data-text')) {
                        text.remove();
                    }
                });
            }
        });
    }
    
    const startTyping = () => { 
        typingElements.forEach(element => {
            
            const typingTextsArray = Array.from(element.children);
        
            let previousDelay = 0;
    
            typingTextsArray.forEach((text, j) => {
                const type = text.getAttribute('data-text').split('');
                const sleepingDelay = parseInt(typingTime) * type.length;
                const nextDelay = (parseInt(typingTime) * type.length + sleepingTime + parseInt(deletingTime) * type.length + previousDelay) + parseInt(intervalTime);
    
                if (j === 0) {
                    previousDelay = parseInt(intervalTime);
                }
    
                setTimeout(() => {
                    if (j > 0) {
                        element.children[j - 1].style.display = 'none';
                    }
                    text.style.display = 'block';
    
                    type.forEach((value, k) => {
                        setTimeout(() => {
                            text.innerHTML += value;
                        }, parseInt(typingTime) * k);
                    });
    
                    setTimeout(() => {
                        const tempLength = text.innerHTML.length;
                        for (let k = 0; k < tempLength; k++) {
                            setTimeout(() => {
                                text.innerHTML = text.innerHTML.slice(0, -1);
                                if (text.innerHTML === '') {
                                    if (j === typingTextsArray.length - 1) {
                                        if (typingLoop) {
                                            element.children[0].style.display = 'block';
                                            setTimeout(() => {
                                                typingTextsArray.forEach(function(element){
                                                    element.style = 'none';
                                                })
                                                startTyping(); 
                                            }, 0); 
                                        }
                                    }
                                }
                            }, parseInt(deletingTime) * k);
                        }
                    }, sleepingDelay + sleepingTime);
    
                }, previousDelay);
    
                previousDelay = nextDelay;
            });
        });
    }
    
    checkHTML();
    startTyping();
}
