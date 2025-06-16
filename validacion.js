window.addEventListener('load', function() {
    const form = document.getElementById('formContacto1');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar errores previos
            clearErrors();

            // Validar campos
            const isNombreValid = validateNombre();
            const isEmailValid = validateEmail();
            const isTelefonoValid = validateTelefono();
            const isAsuntoValid = validateAsunto();
            const isMensajeValid = validateMensaje();

            // Si todo es válido, enviar
            if (isNombreValid && isEmailValid && isTelefonoValid && isAsuntoValid && isMensajeValid) {
                alert('✅ Formulario enviado correctamente');
                form.reset(); // Opcional: resetear el formulario
            }
        });

        // Funciones de validación
        function clearErrors() {
            document.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
        }

        function validateNombre() {
            const nombre = document.getElementById('nombre');
            if (nombre.value.trim() === '') {
                nombre.classList.add('is-invalid');
                return false;
            }
            return true;
        }

        function validateEmail() {
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                return false;
            }
            return true;
        }

        function validateTelefono() {
            const telefono = document.getElementById('telefono');
            const telefonoRegex = /^[0-9]{10,}$/; // Mínimo 10 dígitos
            if (!telefonoRegex.test(telefono.value)) {
                telefono.classList.add('is-invalid');
                return false;
            }
            return true;
        }

        function validateAsunto() {
            const asunto = document.getElementById('asunto');
            if (asunto.value === '') {
                asunto.classList.add('is-invalid');
                return false;
            }
            return true;
        }

        function validateMensaje() {
            const mensaje = document.getElementById('mensaje');
            if (mensaje.value.trim() === '') {
                mensaje.classList.add('is-invalid');
                return false;
            }
            return true;
        }
    } else {
        console.error('⚠️ El formulario no existe. Revisa el ID "formContacto1"');
    }
});
