<script setup>
// defineProps declara las propiedades que el componente padre puede pasarle.
// 'cell' es el valor de la casilla: 'X', 'O' o null (casilla vacía).
const props = defineProps({
  cell: {
    type: String,
    default: null,
  },
})

// defineEmits declara los eventos que este componente puede emitir hacia el padre.
// El padre escuchará este evento con @click="handleClick(index)".
const emit = defineEmits(['click'])

function cellClass() {
  if (!props.cell) return 'btn-outline-secondary'
  return props.cell === 'X' ? 'btn-primary' : 'btn-danger'
}
</script>

<template>
  <!-- Al hacer clic, emitimos el evento 'click' hacia el componente padre.
       El padre decide qué hacer con él (tiene el índice en contexto). -->
  <button
    class="btn m-1 fw-bold fs-2"
    :class="cellClass()"
    style="width: 90px; height: 90px;"
    @click="emit('click')"
  >
    {{ cell }}
  </button>
</template>
