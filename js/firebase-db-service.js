var app = angular.module('miningApp');

const firebaseConfig = {
  apiKey: "AIzaSyCUsxA1CfmpvRiJ49evM4CghbEdJPvMHCo",
  authDomain: "wminerrc-70579.firebaseapp.com",
  projectId: "wminerrc-70579",
  storageBucket: "wminerrc-70579.appspot.com",
  messagingSenderId: "71727690888",
  appId: "1:71727690888:web:aceb60286a3789057a1b3d",
  measurementId: "G-FMCB49MDHL"
};

app.service('FirebaseService', ['$http', '$q', function ($http, $q) {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();

    function timeAgo(fromTime) {
        try {
            let diff = (new Date() - (fromTime.toDate())) / 1000;

            let units = [
                { limit: 60, name: "saniye" },
                { limit: 3600, name: "dakika" },
                { limit: 86400, name: "saat" },
                { limit: Infinity, name: "gün" }
            ];

            for (let i = 0; i < units.length; i++) {
                let { limit, name } = units[i];
                if (diff < limit)
                    return `${Math.floor(diff / (limit / 60)) || 1} ${name} önce`;
                diff /= limit / 60;
            }
        } catch (err) {
            return '';
        }
    }

    function getDateRange(startDate, endDate) {

        const today = new Date();

        startDate = startDate
            ? new Date(startDate)
            : new Date(today.setDate(today.getDate() - 5));

        endDate = endDate ? new Date(endDate) : new Date();

        const dateRange = [];

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            dateRange.push(d.toISOString().split("T")[0]);
        }

        return dateRange;
    }

    this.persistUser = async function (usr) {

        const docRef = db.collection("users").doc(usr.avatar_id);

        const queryData = {
            name: usr.name,
            powerData: usr.powerData,
            rooms: usr.roomData.rooms.length,
            queriedAt: new Date().toISOString().split('T')[0]
        };

        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {

            const existingUserData = docSnapshot.data();

            let searchCount = existingUserData.searchCount ?? 0;

            let updatedQueries = existingUserData.queries || [];

            updatedQueries = updatedQueries.filter(q => q.queriedAt !== queryData.queriedAt);

            updatedQueries.push(queryData);

            await docRef.update({
                name: usr.name,
                searchCount: ++searchCount,
                queries: updatedQueries,
                power: usr.powerData,
                lastSearchedAt: new Date()
            });

        } else {

            const newUserData = {
                name: usr.name,
                searchCount: 1,
                queries: [queryData],
                power: usr.powerData,
                lastSearchedAt: new Date()
            };

            await docRef.set(newUserData);
        }

    };

    this.listUsers = async function () {

        const docs = (await db.collection("users")
            .orderBy('lastSearchedAt', 'desc')
            .limit(5)
            .get()).docs;

        const users = docs.map(u => u.data());

        users.forEach(u => u.timeAgo = timeAgo(u.lastSearchedAt));

        return users;

    };

    this.getBonusTask = async function () {

        const docRef = db.collection("bonus_task").doc("today");

        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            return docSnapshot.data();
        }

    };

}]);