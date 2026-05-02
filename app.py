
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Configuration
WHATSAPP_NUMBER = "+243895288981"  # Remplace par ton numéro
WHATSAPP_MESSAGE = "Bonjour, je souhaite créer mon site de salon"

@app.route('/')
def index():
    return render_template('index.html',
                           whatsapp_number=WHATSAPP_NUMBER,
                           whatsapp_message=WHATSAPP_MESSAGE)

@app.route('/health')
def health():
    return "OK" , 200

@app.route('/contact', methods=['POST'])
def contact():
    email = request.form.get('email')
    name = request.form.get('name')
    # Enregistrer le lead (DB, email, etc.)
    return jsonify({'success': True, 'message': 'Merci ! Nous vous contactons sous 24h.'})

if __name__ == '__main__':
    app.run(debug=True)

