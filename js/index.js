document.addEventListener('DOMContentLoaded', (event) => {

    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });

    // Init TypingJS
    TypingJS({
        selector: '.typing-js',
        typingTime: 40, // optional
        sleepingTime: 2000, // optional
        deletingTime: 25, // optional
        typingLoop: true, // optional
    });
    
});

