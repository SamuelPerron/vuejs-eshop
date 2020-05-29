<template>
    <div class="rating">
        <ul class="stars">
            <li v-for="star in score" :key="star.id">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17.149" data-active="true">
                    <path d="M8.428 14.666L3.77 17.113a.307.307 0 01-.446-.323l1-5.823L.092 6.842a.307.307 0 01.171-.523l5.847-.85L8.725.171a.307.307 0 01.55 0l2.615 5.298 5.847.85a.307.307 0 01.17.523l-4.23 4.125.999 5.823a.307.307 0 01-.446.323l-4.658-2.447a1.23 1.23 0 00-1.144 0z" fill-rule="evenodd"></path>
                </svg>
            </li>
            <li v-for="emptyStar in 5 - score" :key="emptyStar.id" class="empty-star">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17.149" data-active="true">
                    <path d="M8.428 14.666L3.77 17.113a.307.307 0 01-.446-.323l1-5.823L.092 6.842a.307.307 0 01.171-.523l5.847-.85L8.725.171a.307.307 0 01.55 0l2.615 5.298 5.847.85a.307.307 0 01.17.523l-4.23 4.125.999 5.823a.307.307 0 01-.446.323l-4.658-2.447a1.23 1.23 0 00-1.144 0z" fill-rule="evenodd"></path>
                </svg>
            </li>
        </ul>
        <strong v-if="nb > 0">{{ nb }} rating<strong v-if="nb > 1">s</strong></strong>
    </div>
</template>

<script>
import '../assets/css/rating.scss';

export default {
    name: 'Rating',
    props: ['score', 'nb',]
}
</script>
