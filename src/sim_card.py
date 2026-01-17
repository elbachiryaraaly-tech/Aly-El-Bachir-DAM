class SimCard:
    def __init__(self, icc_id, pin="1234", puk="12345678"):
        self.icc_id = icc_id
        self._pin = pin
        self._puk = puk
        self.pin_attempts_left = 3
        self.puk_attempts_left = 10
        self.state = "READY"  # READY, PIN_LOCKED, PUK_LOCKED, PERMANENTLY_BLOCKED

    def verify_pin(self, pin_input):
        if self.state == "PERMANENTLY_BLOCKED":
            return False, "La tarjeta SIM está bloqueada permanentemente."
        
        if self.state == "PUK_LOCKED":
            return False, "Se requiere código PUK."

        if pin_input == self._pin:
            self.pin_attempts_left = 3
            self.state = "READY"
            return True, "PIN correcto. Acceso concedido."
        else:
            self.pin_attempts_left -= 1
            if self.pin_attempts_left <= 0:
                self.state = "PUK_LOCKED"
                return False, "PIN incorrecto. Tarjeta bloqueada. Se requiere PUK."
            return False, f"PIN incorrecto. Intentos restantes: {self.pin_attempts_left}"

    def verify_puk(self, puk_input, new_pin):
        if self.state == "PERMANENTLY_BLOCKED":
            return False, "La tarjeta SIM está bloqueada permanentemente."

        if self.state != "PUK_LOCKED" and self.pin_attempts_left > 0:
             return False, "La tarjeta no requiere PUK actualmente."

        if puk_input == self._puk:
            self.puk_attempts_left = 10
            self._pin = new_pin
            self.pin_attempts_left = 3
            self.state = "READY"
            return True, "PUK correcto. PIN restablecido."
        else:
            self.puk_attempts_left -= 1
            if self.puk_attempts_left <= 0:
                self.state = "PERMANENTLY_BLOCKED"
                return False, "PUK incorrecto. Tarjeta bloqueada permanentemente (quemada)."
            return False, f"PUK incorrecto. Intentos restantes: {self.puk_attempts_left}"

    def get_status(self):
        return {
            "ICCID": self.icc_id,
            "Estado": self.state,
            "Intentos PIN": self.pin_attempts_left,
            "Intentos PUK": self.puk_attempts_left
        }
