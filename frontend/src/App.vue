<template>
    <div class="h-auto min-h-screen flex flex-col">
        <div class="bg-black h-screen w-full fixed top-0 left-0"></div>
        <div class="absolute w-full h-full text-white">
            <div class="bg-blue-900 w-full h-[10%] flex items-center justify-end px-5">
                <p class="text-3xl font-bold">
                    {{timestamp}}
                </p>
            </div>
            <div class="w-full h-1/4 flex gap-10 justify-center items-center" v-if="this.dataShow!=null && this.dataShow.length>0">
                <div class="flex gap-3 items-center">
                    <i class="fa fa-thermometer-half text-8xl"></i>
                    <p class="text-5xl">{{dataShow[0].temperature}}<span>&#176;</span>C</p>
                </div>
                <div class="flex gap-3 items-center">
                    <img src="humidity.png" alt="" class="invert w-20 h-24">
                    <p class="text-5xl">{{dataShow[0].humidity}}%</p>
                </div>
            </div>
            <div class="w-full h-auto flex justify-center ">
                <div class="overflow-auto w-5/6 h-auto max-h-[25rem] no-scrollbar mt-5 rounded-lg
                            xl:w-3/4">
                    <table class="table-fixed w-full">
                        <thead class="bg-gray-800 text-white sticky top-0 z-50 font-bold md:text-xl">
                            <tr>
                                <th class="w-4/12 py-2">Tanggal</th>
                                <th class="w-2/12">Waktu</th>
                                <th class="w-3/12">Temperatur (<span>&#176;</span>C)</th>
                                <th class="w-3/12">Kelembapan (%)</th>
                            </tr>
                        </thead>
                        <tbody v-if="this.dataShow!=null && this.dataShow.length>0" class="md:font-semibold">
                            <tr class="text-center odd:bg-opacity-90 even:bg-opacity-90 odd:bg-gray-600 even:bg-gray-700" v-for="i in this.dataShow" :key="i">
                                <td class="px-1 py-3 text-xs md:text-base">{{toDate(i.time)}}</td>
                                <td>{{toTime(i.time)}}</td>
                                <td>{{i.temperature}}</td>
                                <td>{{i.humidity}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center bg-foreground-4-50 text-xl">
                                <td colspan="4" class="py-5">Belum ada data tersedia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    components: {
        axios
    },
    data() {
        return {
            port: import.meta.env.VITE_BACKEND_URL,
            counter: 0,
            timestamp: "",
            dataShow: null,
            month: ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
            day: ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]
        }
    },
    async created() {
        this.timerWaktu = setInterval(() => {
            this.getNow()
            this.counter++
            if (this.counter>9){
                this.refresh()
                this.counter = 0
            }
        }, 1000)
    },
    methods: {
        toDateTime(timeString){
            const waktu = new Date(timeString)
            const date = this.day[waktu.getDay()] + ", " + ('00'+waktu.getDate()).slice(-2) + " " + this.month[waktu.getMonth()] + " " + waktu.getFullYear()
            const time = ('00'+waktu.getHours()).slice(-2) + ":" + ('00'+waktu.getMinutes()).slice(-2) + ":" + ('00'+waktu.getSeconds()).slice(-2)
            const dateTime = date + ' ' + time
            return dateTime
        },
        getNow() {
            const today = new Date()
            this.timestamp = this.toDateTime(today)
        },
        toDate(timeString){
            const waktu = new Date(timeString)
            const date = this.day[waktu.getDay()] + ", " + ('00'+waktu.getDate()).slice(-2) + " " + this.month[waktu.getMonth()] + " " + waktu.getFullYear()
            const dateTime = date
            return dateTime
        },
        toTime(timeString){
            const waktu = new Date(timeString)
            const time = ('00'+waktu.getHours()).slice(-2) + ":" + ('00'+waktu.getMinutes()).slice(-2) + ":" + ('00'+waktu.getSeconds()).slice(-2)
            const dateTime = time
            return dateTime
        },
        refresh(){
            axios
            .get(this.port+`/`)
            .then(({data}) => {
                this.dataShow = data
                console.log(this.dataShow)
            })
        }
    },
    async mounted(){
        this.refresh()
    },
}
</script>
<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
</style>
