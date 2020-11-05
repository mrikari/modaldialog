(function (g) {
    var button = g.document.getElementById('modalest'),
        button2 = g.document.getElementById('dontpush'),
        modal = new ModalDialog();

    button.addEventListener('click', function () {
        modal.open();
    });

    button2.addEventListener('click', function () {
        console.log('Don\'t push.');
    })
})(window);