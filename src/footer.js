const footerHTML = `<footer class="section-footer">
    <div class="footer-container container">
        <div class="content_1">
            <img src="./public/Screenshot 2025-02-12 092542.png " alt="logo">
            <p>
              Welcome to KANHA-STORE and buy product
            </p>
            <img src="./public/payment-method-c454fb.svg" alt="card">
        </div>
        <div class="conten_2">
            <h4>SOPPING</h4>
            <a href="#">computer store</a>
            <a href="#">computer store</a>
            <a href="#">computer store</a>
            <a href="#">computer store</a>
        </div>

        <div class="content_3">
            <h4>EXPRIENCE</h4>
            <a href=".contact.html">Contact Us</a>
            <a href="" target="_blank">patment Method</a>
            <a href="" target="_blank">Delivery</a>
            <a href="" target="_blank">return and Exchange</a>
        </div>
        <div class="content_4">
            <h4>NEWSLETTER</h4>
            <P>Be the first know about new <br/>arrivals, Sales & promos!</P>
            <div class="f-mail">
                <input type="email" placeholder="Your Email">
                <i class="bx bx envelope"></i>
            </div>
            <hr/>
        </div>
        <div class="f-design">
            <div class="f-design-txt">
                <p>Welcome to KANHA-STORE</p>
            </div>
        </div>
    </div>
  </footer>`;

const footerElem = document.querySelector(".section-footer");
footerElem.insertAdjacentElement("afterbegin",footerHTML)

