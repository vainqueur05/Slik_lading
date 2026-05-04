from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

WHATSAPP_NUMBER = "+243895288981"
MESSAGE_DEFAUT = "Bonjour ! Je désire un site vitrine gratuit pour mon salon de coiffure. Pouvez-vous m'envoyer un exemple ?"

@app.route('/')
def index():
    msg = request.args.get('msg', MESSAGE_DEFAUT)
    return render_template('index.html',
                           whatsapp_number=WHATSAPP_NUMBER,
                           whatsapp_message=msg)

@app.route('/health')
def health():
    return "OK", 200

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name', '')
    email = request.form.get('email', '')
    # Message personnalisé
    message = f"Bonjour Vainqueur, je suis {name} ({email}). Je souhaite un site vitrine gratuit pour mon salon."
    whatsapp_url = f"https://wa.me/{WHATSAPP_NUMBER}?text={message}"
    return jsonify({'success': True, 'whatsapp_url': whatsapp_url})

if __name__ == '__main__':
    app.run(debug=True)
