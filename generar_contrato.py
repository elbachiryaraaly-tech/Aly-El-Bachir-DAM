import datetime

def generar_contrato(empleador, empleado, puesto, salario, fecha_inicio):
    fecha_actual = datetime.date.today().strftime("%d/%m/%Y")
    
    contrato = f"""
================================================================
                    CONTRATO DE TRABAJO
================================================================

En la ciudad de Madrid, a {fecha_actual}.

REUNIDOS:

De una parte, {empleador}, en adelante "EL EMPLEADOR".
De otra parte, {empleado}, en adelante "EL TRABAJADOR".

EXPONEN:

1. Que EL EMPLEADOR desea contratar los servicios de EL TRABAJADOR para desempeñar el puesto de {puesto}.
2. Que EL TRABAJADOR acepta dicha contratación bajo las siguientes condiciones.

CLÁUSULAS:

PRIMERA. El puesto de trabajo será: {puesto}.
SEGUNDA. La fecha de inicio de la relación laboral será: {fecha_inicio}.
TERCERA. La retribución bruta anual será de {salario} euros, distribuida en 12 o 14 pagas según convenio.
CUARTA. La jornada de trabajo será a tiempo completo.

Y en prueba de conformidad, firman el presente contrato por duplicado.

__________________________                  __________________________
Firma de EL EMPLEADOR                       Firma de EL TRABAJADOR
"""
    return contrato

if __name__ == "__main__":
    print("--- GENERADOR AUTOMÁTICO DE CONTRATOS ---")
    print("Por favor, introduce los datos para generar el contrato al instante:\n")
    
    empleador = input("Nombre de la empresa o empleador: ") or "Empresa Ficticia S.L."
    empleado = input("Nombre del trabajador: ") or "Juan Pérez"
    puesto = input("Puesto de trabajo: ") or "Desarrollador Junior"
    salario = input("Salario anual bruto (€): ") or "24.000"
    fecha_inicio = input("Fecha de inicio (DD/MM/AAAA): ") or datetime.date.today().strftime("%d/%m/%Y")
    
    contrato_generado = generar_contrato(empleador, empleado, puesto, salario, fecha_inicio)
    
    print("\nGenerando contrato...")
    print(contrato_generado)
    print("\n¡Contrato generado exitosamente!")
