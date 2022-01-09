$('.navback').click(e => {
    try {
        window.location.href = 'index.html'
    } catch (error) {
        console.error(error);
    }
})