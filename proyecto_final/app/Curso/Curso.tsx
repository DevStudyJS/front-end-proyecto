'use client'

import { useEffect } from 'react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import styles from './lessons.module.css'

export default function LessonsPage() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(target.getAttribute('href')!)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            📚 Unidad 1: <span>Significado y Uso de los Números</span>
          </h1>
          <p className={styles.subtitle}>
            Aprende las bases de forma divertida con nuestra plataforma educativa 🚀
          </p>
        </header>

        <div className={styles.mainGrid}>
          {/* NAVEGACIÓN LATERAL */}
          <aside className={styles.navPanel}>
            <h3 className={styles.navTitle}>📑 Contenido</h3>
            <ul className={styles.navList}>
              <li className={styles.navItem}><a href="#enteros" className={styles.navLink}>1. Números Enteros</a></li>
              <li className={styles.navItem}><a href="#operaciones-enteros" className={styles.navLink}>1.1 Operaciones básicas</a></li>
              <li className={styles.navItem}><a href="#problemas-enteros" className={styles.navLink}>1.2 Problemas</a></li>
              <li className={styles.navItem}><a href="#fraccionarios" className={styles.navLink}>2. Fracciones y Decimales</a></li>
              <li className={styles.navItem}><a href="#proporcionalidad" className={styles.navLink}>1.3 Proporcionalidad</a></li>
              <li className={styles.navItem}><a href="#operaciones-fracciones" className={styles.navLink}>1.4 Operaciones</a></li>
              <li className={styles.navItem}><a href="#porcentajes" className={styles.navLink}>1.5 Porcentajes</a></li>
              <li className={styles.navItem}><a href="#potenciacion" className={styles.navLink}>1.6 Potencias y Raíces</a></li>
              <li className={styles.navItem}><a href="#problemas-fracciones" className={styles.navLink}>1.7 Problemas</a></li>
            </ul>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <main className={styles.contentArea}>
            {/* SECCIÓN 1: NÚMEROS ENTEROS */}
            <section id="enteros" className={styles.section}>
              <h2 className={styles.sectionTitle}>🔢 Números Enteros</h2>
              
              <div className={styles.subsection}>
                <p className={styles.contentText}>
                  Los <strong>números enteros</strong> son el conjunto de números que incluye a los números positivos (1, 2, 3...), 
                  el cero (0) y los números negativos (-1, -2, -3...). Se representan con la letra ℤ y son fundamentales 
                  para expresar cantidades que pueden estar por encima o por debajo de un punto de referencia.
                </p>
                
                <div className={styles.importantBox}>
                  <strong>💡 Características principales:</strong>
                  <ul>
                    <li><strong>Positivos:</strong> Mayores que cero (+1, +2, +3...)</li>
                    <li><strong>Negativos:</strong> Menores que cero (-1, -2, -3...)</li>
                    <li><strong>Cero:</strong> No es positivo ni negativo</li>
                    <li><strong>Valor absoluto:</strong> Distancia al cero: |−5| = 5</li>
                  </ul>
                </div>

                <div className={styles.exampleBox}>
                  <strong>🌟 Ejemplos en la vida real:</strong>
                  <ul>
                    <li>Temperatura: −5°C, +25°C</li>
                    <li>Altitud: −100m (bajo el mar), +3000m (montaña)</li>
                    <li>Finanzas: −$500 (deuda), +$2000 (ahorro)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECCIÓN 1.1: OPERACIONES BÁSICAS */}
            <section id="operaciones-enteros" className={styles.section}>
              <h2 className={styles.sectionTitle}> 1.1 Operaciones Básicas con Enteros</h2>
              
              <div className={styles.subsection}>
                <h3> Suma de Números Enteros</h3>
                <p className={styles.contentText}>
                  La suma sigue reglas según los signos:
                </p>

                <div className={styles.grid2}>
                  <div className={styles.infoCard}>
                    <h4>Mismo signo</h4>
                    <p className={styles.contentText}>Se suman los valores absolutos y se conserva el signo:</p>
                    <div className={styles.formulaBox}>
                      <BlockMath math="(+3) + (+5) = +8" />
                      <BlockMath math="(-3) + (-5) = -8" />
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <h4>Diferente signo</h4>
                    <p className={styles.contentText}>Se restan y se coloca el signo del mayor:</p>
                    <div className={styles.formulaBox}>
                      <BlockMath math="(+7) + (-4) = +3" />
                      <BlockMath math="(-7) + (+4) = -3" />
                    </div>
                  </div>
                </div>

                <h3>📌 Resta de Números Enteros</h3>
                <p className={styles.contentText}>
                  Restar = sumar el opuesto:
                </p>
                <div className={styles.formulaBox}>
                  <BlockMath math="a - b = a + (-b)" />
                </div>
                
                <div className={styles.exampleBox}>
                  <strong>🎮 Ejemplos:</strong>
                  <ul>
                    <li><InlineMath math="(+8) - (+3) = +5" /></li>
                    <li><InlineMath math="(+8) - (-3) = +11" /></li>
                    <li><InlineMath math="(-8) - (+3) = -11" /></li>
                    <li><InlineMath math="(-8) - (-3) = -5" /></li>
                  </ul>
                </div>

                <h3>📌 Multiplicación y División</h3>
                
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Operación</th>
                        <th>Signo</th>
                        <th>Ejemplo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>(+) × (+) o (+) ÷ (+)</td>
                        <td><span className={`${styles.badge} ${styles.badgePurple}`}>+</span></td>
                        <td>(+6) × (+2) = +12</td>
                      </tr>
                      <tr>
                        <td>(−) × (−) o (−) ÷ (−)</td>
                        <td><span className={`${styles.badge} ${styles.badgePurple}`}>+</span></td>
                        <td>(−6) × (−2) = +12</td>
                      </tr>
                      <tr>
                        <td>(+) × (−) o (+) ÷ (−)</td>
                        <td><span className={`${styles.badge} ${styles.badgeOrange}`}>−</span></td>
                        <td>(+6) × (−2) = −12</td>
                      </tr>
                      <tr>
                        <td>(−) × (+) o (−) ÷ (+)</td>
                        <td><span className={`${styles.badge} ${styles.badgeOrange}`}>−</span></td>
                        <td>(−6) × (+2) = −12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={styles.importantBox}>
                  <strong>📝 Regla mnemotécnica:</strong>
                  <p><em>"Signos iguales = positivo, signos diferentes = negativo"</em></p>
                </div>
              </div>

              <div className={styles.subsection}>
                <h3>📌 Jerarquía de Operaciones</h3>
                <ol className={styles.contentText}>
                  <li><strong>Paréntesis</strong></li>
                  <li><strong>Potencias y raíces</strong></li>
                  <li><strong>Multiplicaciones y divisiones</strong></li>
                  <li><strong>Sumas y restas</strong></li>
                </ol>

                <div className={styles.exampleBox}>
                  <strong>⚡ Ejemplo:</strong>
                  <div className={styles.formulaBox}>
                    <BlockMath math="3 + 4 \\times (5 - 2)^2 = 3 + 4 \\times 9 = 3 + 36 = 39" />
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 1.2: PROBLEMAS */}
            <section id="problemas-enteros" className={styles.section}>
              <h2 className={styles.sectionTitle}>🎯 1.2 Resolución de Problemas</h2>
              
              <div className={styles.subsection}>
                <h3>Estrategia</h3>
                <ol className={styles.contentText}>
                  <li><strong>Leer</strong> cuidadosamente</li>
                  <li><strong>Identificar</strong> datos</li>
                  <li><strong>Determinar</strong> operaciones</li>
                  <li><strong>Resolver</strong> paso a paso</li>
                  <li><strong>Verificar</strong> la respuesta</li>
                </ol>
              </div>

              <div className={styles.subsection}>
                <h3>Problemas resueltos</h3>

                <div className={styles.exampleBox}>
                  <strong>🌡️ Problema 1: Temperatura</strong>
                  <p>Mañana: −3°C. Subió 8°C, luego bajó 5°C. ¿Noche?</p>
                  <div className={styles.formulaBox}>
                    <BlockMath math="-3 + 8 - 5 = 0°C" />
                  </div>
                </div>

                <div className={styles.exampleBox}>
                  <strong>💰 Problema 2: Finanzas</strong>
                  <p>María tiene $500. Retira $200, deposita $350, paga $150.</p>
                  <div className={styles.formulaBox}>
                    <BlockMath math="500 - 200 + 350 - 150 = \$500" />
                  </div>
                </div>

                <div className={styles.exampleBox}>
                  <strong>🏔️ Problema 3: Altitud</strong>
                  <p>Alpinista a 2,500 m. Baja 800 m, sube 450 m.</p>
                  <div className={styles.formulaBox}>
                    <BlockMath math="2500 - 800 + 450 = 2150 \text{ m}" />
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 2: FRACCIONES */}
            <section id="fraccionarios" className={styles.section}>
              <h2 className={styles.sectionTitle}>🔢 2. Fracciones y Decimales</h2>
              
              <div className={styles.subsection}>
                <p className={styles.contentText}>
                  Las <strong>fracciones</strong> representan partes de un todo:
                  <InlineMath math="\frac{a}{b}" /> (a = numerador, b = denominador).
                </p>

                <div className={styles.grid2}>
                  <div className={styles.infoCard}>
                    <h4>Tipos de fracciones</h4>
                    <ul className={styles.contentText}>
                      <li><strong>Propias:</strong> <InlineMath math="\frac{2}{5}" /></li>
                      <li><strong>Impropias:</strong> <InlineMath math="\frac{7}{3}" /></li>
                      <li><strong>Mixtas:</strong> <InlineMath math="2\frac{1}{3}" /></li>
                    </ul>
                  </div>

                  <div className={styles.infoCard}>
                    <h4>Conversión</h4>
                    <div className={styles.formulaBox}>
                      <BlockMath math="\frac{1}{2} = 0.5" />
                      <BlockMath math="\frac{3}{4} = 0.75" />
                      <BlockMath math="\frac{1}{3} = 0.333..." />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 1.3: PROPORCIONALIDAD */}
            <section id="proporcionalidad" className={styles.section}>
              <h2 className={styles.sectionTitle}>⚖️ 1.3 Proporcionalidad</h2>
              
              <div className={styles.subsection}>
                <h3>Proporcionalidad Directa</h3>
                <p className={styles.contentText}>
                  Si una magnitud aumenta, la otra aumenta proporcionalmente.
                </p>

                <div className={styles.formulaBox}>
                  <BlockMath math="\frac{a}{b} = \frac{c}{d}" />
                </div>

                <div className={styles.exampleBox}>
                  <strong>🛒 Ejemplo:</strong> 3 kg cuestan $6 → ¿5 kg?
                  <div className={styles.formulaBox}>
                    <BlockMath math="\frac{3}{6} = \frac{5}{x} \Rightarrow x = \frac{5 \times 6}{3} = \$10" />
                  </div>
                </div>

                <div className={styles.importantBox}>
                  <strong>📝 Regla de Tres:</strong>
                  <div className={styles.formulaBox}>
                    <BlockMath math="x = \frac{b \times c}{a}" />
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 1.4: OPERACIONES FRACCIONES */}
            <section id="operaciones-fracciones" className={styles.section}>
              <h2 className={styles.sectionTitle}>🧮 1.4 Operaciones con Fracciones</h2>
              
              <div className={styles.subsection}>
                <h3>Suma y Resta</h3>
                
                <div className={styles.grid2}>
                  <div className={styles.infoCard}>
                    <h4>Mismo denominador</h4>
                    <div className={styles.formulaBox}>
                      <BlockMath math="\frac{a}{c} \pm \frac{b}{c} = \frac{a \pm b}{c}" />
                    </div>
                    <p className={styles.contentText}><InlineMath math="\frac{3}{7} + \frac{2}{7} = \frac{5}{7}" /></p>
                  </div>

                  <div className={styles.infoCard}>
                    <h4>Diferente denominador</h4>
                    <div className={styles.formulaBox}>
                      <BlockMath math="\frac{a}{b} \pm \frac{c}{d} = \frac{ad \pm bc}{bd}" />
                    </div>
                    <p className={styles.contentText}><InlineMath math="\frac{1}{3} + \frac{1}{4} = \frac{7}{12}" /></p>
                  </div>
                </div>

                <h3>Multiplicación</h3>
                <div className={styles.formulaBox}>
                  <BlockMath math="\frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd}" />
                </div>

                <h3>División</h3>
                <div className={styles.formulaBox}>
                  <BlockMath math="\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c}" />
                </div>
              </div>
            </section>

            {/* SECCIÓN 1.5: PORCENTAJES */}
            <section id="porcentajes" className={styles.section}>
              <h2 className={styles.sectionTitle}>💯 1.5 Porcentajes</h2>
              
              <div className={styles.subsection}>
                <p className={styles.contentText}>
                  El <strong>porcentaje</strong> expresa un número como fracción de 100.
                </p>

                <div className={styles.formulaBox}>
                  <BlockMath math="\% = \frac{\text{Parte}}{\text{Total}} \times 100" />
                </div>

                <div className={styles.grid2}>
                  <div className={styles.infoCard}>
                    <h4>Calcular % de una cantidad</h4>
                    <div className={styles.formulaBox}>
                      <BlockMath math="x\% \text{ de } N = \frac{x}{100} \times N" />
                    </div>
                    <p className={styles.contentText}>20% de 150 = 30</p>
                  </div>

                  <div className={styles.infoCard}>
                    <h4>Descuentos</h4>
                    <div className={styles.formulaBox}>
                      <BlockMath math="\text{Final} = \text{Precio} \times (1 - \frac{\%}{100})" />
                    </div>
                    <p className={styles.contentText}$80 con 25% off = $60</p>
                  </div>
                </div>

                <div className={styles.exampleBox}>
                  <strong>🛍️ Descuento práctico:</strong>
                  <p>Camisa $80 con 25% de descuento:</p>
                  <div className={styles.formulaBox}>
                    <BlockMath math="\text{Descuento} = 80 \times 0.25 = \$20" />
                    <BlockMath math="\text{Final} = 80 - 20 = \$60" />
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 1.6: POTENCIAS */}
            <section id="potenciacion" className={styles.section}>
              <h2 className={styles.sectionTitle}>⚡ 1.6 Potencias y Raíces</h2>
              
              <div className={styles.subsection}>
                <h3>Potenciación</h3>
                <div className={styles.formulaBox}>
                  <BlockMath math="a^n = a \times a \times ... \times a" />
                </div>

                <h4>Leyes de los Exponentes</h4>
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr><th>Ley</th><th>Fórmula</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Producto misma base</td>
                        <td><InlineMath math="a^m \times a^n = a^{m+n}" /></td>
                      </tr>
                      <tr>
                        <td>Cociente misma base</td>
                        <td><InlineMath math="\frac{a^m}{a^n} = a^{m-n}" /></td>
                      </tr>
                      <tr>
                        <td>Potencia de potencia</td>
                        <td><InlineMath math="(a^m)^n = a^{m \times n}" /></td>
                      </tr>
                      <tr>
                        <td>Exponente cero</td>
                        <td><InlineMath math="a^0 = 1" /></td>
                      </tr>
                      <tr>
                        <td>Exponente negativo</td>
                        <td><InlineMath math="a^{-n} = \frac{1}{a^n}" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3>Radicación</h3>
                <div className={styles.formulaBox}>
                  <BlockMath math="\sqrt[n]{a} = b \quad \text{si} \quad b^n = a" />
                </div>
                
                <div className={styles.grid2}>
                  <div className={styles.infoCard}>
                    <h4>Raíz cuadrada</h4>
                    <BlockMath math="\sqrt{16} = 4" />
                    <BlockMath math="\sqrt{25} = 5" />
                  </div>
                  <div className={styles.infoCard}>
                    <h4>Raíz cúbica</h4>
                    <BlockMath math="\sqrt[3]{27} = 3" />
                    <BlockMath math="\sqrt[3]{64} = 4" />
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 1.7: PROBLEMAS */}
            <section id="problemas-fracciones" className={styles.section}>
              <h2 className={styles.sectionTitle}>🎯 1.7 Problemas Resueltos</h2>
              
              <div className={styles.subsection}>
                <div className={styles.exampleBox}>
                  <strong>🍰 Problema 1: Pizza</strong>
                  <p>Ana 1/4, Carlos 1/3 → ¿Beatriz?</p>
                  <div className={styles.formulaBox}>
                    <BlockMath math="\frac{1}{4} + \frac{1}{3} = \frac{7}{12}" />
                    <BlockMath math="1 - \frac{7}{12} = \frac{5}{12}" />
                  </div>
                </div>

                <div className={styles.exampleBox}>
                  <strong>🛒 Problema 2: Compras</strong>
                  <p>2.5 kg a $1.80 + 1.75 kg a $3.20</p>
                  <div className={styles.formulaBox}>
                    <BlockMath math="2.5 \times 1.80 = \$4.50" />
                    <BlockMath math="1.75 \times 3.20 = \$5.60" />
                    <BlockMath math="\text{Total} = \$10.10" />
                  </div>
                </div>

                <div className={styles.importantBox}>
                  <strong>💡 Tips para resolver:</strong>
                  <ul>
                    <li>Lee 2 veces el problema</li>
                    <li>Subraya datos clave</li>
                    <li>Dibuja un esquema</li>
                    <li>Verifica tu respuesta</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* RESUMEN FINAL */}
            <section className={styles.resumenSection}>
              <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '2rem' }}>
                📚 Resumen de la Unidad
              </h2>
              <p style={{ textAlign: 'center', opacity: 0.85, marginBottom: '24px' }}>
                ¡Todo lo que necesitas saber en un vistazo!
              </p>
              
              <div className={styles.resumenGrid}>
                <div className={styles.resumenCard}>
                  <h3>🔢 Enteros</h3>
                  <ul>
                    <li>Operaciones con signos</li>
                    <li>Ley de signos</li>
                    <li>Jerarquía</li>
                  </ul>
                </div>
                <div className={styles.resumenCard}>
                  <h3>🍕 Fracciones</h3>
                  <ul>
                    <li>Operaciones básicas</li>
                    <li>Conversión</li>
                    <li>Proporcionalidad</li>
                  </ul>
                </div>
                <div className={styles.resumenCard}>
                  <h3>💯 Porcentajes</h3>
                  <ul>
                    <li>Cálculo de %</li>
                    <li>Descuentos</li>
                    <li>Aplicaciones</li>
                  </ul>
                </div>
                <div className={styles.resumenCard}>
                  <h3>⚡ Potencias</h3>
                  <ul>
                    <li>Leyes exponentes</li>
                    <li>Raíces</li>
                    <li>Simplificación</li>
                  </ul>
                </div>
              </div>
              
              <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '1.15rem', fontWeight: 600 }}>
                ✨ ¡Dominar esto es clave para tu éxito! ✨
              </p>
            </section>
          </main>

          {/* PANEL DERECHO - TIPS */}
          <aside className={styles.sidePanel}>
            <div className={`${styles.tipCard} ${styles.purple}`}>
              <h4 className={styles.tipTitle}>💡 Tip del Día</h4>
              <p className={styles.tipContent}>
                Los números negativos son como deudas: si debes $5 y gastas $3 más, ahora debes $8.
                ¡<InlineMath math="-5 + (-3) = -8" />!
              </p>
            </div>

            <div className={`${styles.tipCard} ${styles.orange}`}>
              <h4 className={styles.tipTitle}>🎮 Consejo Pro</h4>
              <p className={styles.tipContent}>
                Practica 15 minutos al día. ¡La constancia es más importante que la intensidad! 💪
              </p>
            </div>

            <div className={`${styles.tipCard} ${styles.teal}`}>
              <h4 className={styles.tipTitle}>📱 Recursos</h4>
              <p className={styles.tipContent}>
                Usa Khan Academy o Photomath para practicar más. ¡La tecnología es tu aliada! 📲
              </p>
            </div>

            <div className={styles.tipCard} style={{ 
              background: 'var(--gradient-orange)', 
              border: 'none',
              color: 'white'
            }}>
              <h4 className={styles.tipTitle} style={{ color: 'white' }}>🏆 Meta Semanal</h4>
              <p className={styles.tipContent} style={{ color: 'rgba(255,255,255,0.9)' }}>
                Completa al menos 3 secciones esta semana. ¡Vas por buen camino! 🌟
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}