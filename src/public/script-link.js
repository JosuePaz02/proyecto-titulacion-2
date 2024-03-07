//BOTONES PARA MESES SIN INTERESES 
                  document.addEventListener("DOMContentLoaded", function () {
                            const montoInput = document.getElementById("monto");
                    const mesesRadio = document.getElementsByName("meses");

                            montoInput.addEventListener("input", function () {
                              const monto = parseInt(montoInput.value, 10);

                              // Habilitar opciones de meses según la condición del monto
                              if (monto > 0 && monto < 300) {
                                habilitarOpciones([0]); // Agregamos el índice 3 para el pago único
                              } else if (monto >= 300 && monto < 600) {
                                habilitarOpciones([0, 1]); // Agregamos el índice 3 para el pago único
                              } else if (monto >= 600 && monto < 1200) {
                                habilitarOpciones([0, 1, 2]); // Agregamos el índice 3 para el pago único
                              } else if (monto >= 1200) {
                                habilitarOpciones([0, 1, 2, 3]); // Agregamos el índice 3 para el pago único
                              } else {
                                deshabilitarOpciones();
                              }
                            });

                            function habilitarOpciones(opciones) {
                              // Habilitar las opciones indicadas en el array
                              for (let i = 0; i < mesesRadio.length; i++) {
                                mesesRadio[i].disabled = !opciones.includes(i);
                                mesesRadio[i].checked = false;
                              }
                            }

                            function deshabilitarOpciones() {
                              // Deshabilitar todas las opciones
                              for (let i = 0; i < mesesRadio.length; i++) {
                                mesesRadio[i].disabled = true;
                                mesesRadio[i].checked = false;
                              }
                            }

                            // Event listener para desmarcar radio buttons cuando se hace clic en su label
                            const labels = document.querySelectorAll(
                              ".input-container label"
                            );
                            labels.forEach((label) => {
                              label.addEventListener("click", function () {
                                const radio = this.previousElementSibling;
                                radio.checked = !radio.checked;
                              });
                            });
                  });

//BOTON DE VENTANA MODAL
                    // Ventana modal
                    var modal = document.getElementById("ventanaModal");

                    // Botón que abre el modal
                    var boton = document.getElementById("abrirModal");

                    // Hace referencia al elemento <span> que tiene la X que cierra la ventana
                    var span = document.getElementsByClassName("cerrar")[0];

                    // Cuando el usuario hace click en el botón, se abre la ventana
                    boton.addEventListener("click", function () {
                      modal.style.display = "block";
                    });

                    // Si el usuario hace click en la x, la ventana se cierra
                    span.addEventListener("click", function () {
                      modal.style.display = "none";
                    });

                    // Si el usuario hace click fuera de la ventana, se cierra.
                    window.addEventListener("click", function (event) {
                      if (event.target == modal) {
                        modal.style.display = "none";
                      }
                    });
      //nuevo ventana modal 2 para links masivos
                    var modal = document.getElementById("ventanaModal2");

                    // Botón que abre el modal
                    var boton = document.getElementById("abrirModal2");

                    // Hace referencia al elemento <span> que tiene la X que cierra la ventana
                    var span = document.getElementsByClassName("cerrar")[0];

                    // Cuando el usuario hace click en el botón, se abre la ventana
                    boton.addEventListener("click", function () {
                      modal.style.display = "block";
                    });

                    // Si el usuario hace click en la x, la ventana se cierra
                    span.addEventListener("click", function () {
                      modal.style.display = "none";
                    });

                    // Si el usuario hace click fuera de la ventana, se cierra.
                    window.addEventListener("click", function (event) {
                      if (event.target == modal) {
                        modal.style.display = "none";
                      }
                    });
    // Cuadro emergente de cuando el link se manda y desaparezca 
                    document.addEventListener('DOMContentLoaded', function() {
                      var successMessage = document.getElementById('successMessage');
                  
                      if (successMessage) {
                          // Mostrar el cuadro de mensaje
                          successMessage.classList.add('show');
                  
                          // Desaparecer después de 7 segundos
                          setTimeout(function() {
                              successMessage.classList.remove('show');
                          }, 5000);
                  
                          // Manejar el cierre del cuadro
                          var closeButton = successMessage.querySelector('.close');
                          closeButton.addEventListener('click', function() {
                              successMessage.classList.remove('show');
                          });
                      }
                  });