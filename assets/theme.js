document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-product-form]').forEach(form => {
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(form);
            const body = new URLSearchParams(formData);
            const res = await fetch('/cart/add.js', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'POST',
                body,
            })
            console.log('res', res);
            if (res.status === 200) {
                const sectionRes = await fetch('/?sections=ajaxcart')
                console.log('sectionRes', sectionRes)
                const json = await sectionRes.json();
                console.log('json', json);

                const div = document.createElement('div');
                div.innerHTML = json.ajaxcart;
                const cartItems = div.querySelector('[data-ajaxcart]')
                const currentCart = document.querySelector('[data-ajaxcart]')
                currentCart.innerHTML = cartItems.innerHTML;

            }
        })
    });
});

function ajaxCartView() {
    const ajaxCart = document.getElementById('cartContainer');
    ajaxCart.classList.toggle('hidden');
}

document.getElementById('cart-icon').addEventListener('click', ajaxCartView);
document.getElementById('close-cart').addEventListener('click', ajaxCartView);
