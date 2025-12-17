import React, { useState } from 'react';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Demo behaviour: just show a confirmation. Replace with API call if needed.
        alert('Message sent (demo) — thank you, ' + (name || 'guest') + '!');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: 34, marginBottom: 8 }}>Contact Us</h1>
            <p style={{ color: '#555', marginBottom: 24 }}>Have a question or feedback? Send us a message — this is a demo contact form.</p>

            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <label style={{ display: 'block', marginBottom: 8 }}>Name</label>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #ddd', marginBottom: 16 }}
                    required
                />

                <label style={{ display: 'block', marginBottom: 8 }}>Email</label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 6, border: '1px solid #ddd', marginBottom: 16 }}
                    required
                />

                <label style={{ display: 'block', marginBottom: 8 }}>Message</label>
                <textarea
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={8}
                    style={{ width: '100%', padding: 14, borderRadius: 6, border: '1px solid #ddd', marginBottom: 20, resize: 'vertical' }}
                    required
                />

                <button type="submit" style={{ background: '#1d4ed8', color: '#fff', padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Send Message</button>
            </form>
        </div>
    );
}

export default Contact;