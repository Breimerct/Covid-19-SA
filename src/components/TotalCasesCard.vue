<template>
  <q-card class="custom-card text-white bg-cyan-6 q-pa-sm non-selectable" style="--icon: '\F13B6';">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="60px">
          19
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>Ùltima actualizaciòn de los datos</q-item-label>
        <q-item-label class="text-white" caption>12/10/2022 04:33 p.m</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator/>
    <q-card-section class="q-my-none">
      <div class="text-h6 text-weight-light text-weight-light">
        Total de casos confirmados
      </div>
    </q-card-section>
    <q-card-section class="q-py-none">
      <div class="row">
        <div class="col-4">
          <q-icon
            name="mdi-check-bold"
            color="greenn"
            size="40px"
          ></q-icon>
        </div>
        <div class="col-8 text-right">
          <div class="text-h4">
            <p class="q-ma-none">
              {{ '10.000.000' || '...' }}
            </p>
          </div>
          <div class="text-italic">
            {{ 'incremento+ 410' }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'TotalCasesCard'
}
</script>

<style scoped lang="scss">
</style>
