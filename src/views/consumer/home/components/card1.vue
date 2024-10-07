<script setup lang="ts">
    defineProps({
        size: {
            type: String,
            default: "normal",
        },
    });
</script>

<template>
    <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
    />
    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Roboto:wght@300&display=swap"
        rel="stylesheet"
    />
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
    />
    <main>
        <div class="card">
            <img
                src="https://img14.360buyimg.com/n0/jfs/t1/247471/29/19259/42001/66f8c969Ffa1d522b/f93204a81d936d9b.jpg"
                alt=""
            />
            <div class="card-content">
                <h2>Card Heading</h2>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt exercitationem iste, voluptatum, quia explicabo
                    laboriosam rem adipisci voluptates cumque, veritatis atque
                    nostrum corrupti ipsa asperiores harum? Dicta odio aut hic.
                </p>
                <a
                    href="#"
                    class="button"
                >
                    Find out more
                    <span class="material-symbols-outlined">
                        arrow_right_alt
                    </span>
                </a>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
    // Colors
    $color-primary-white: rgb(240, 240, 240);

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 50px;
        font-family: "Roboto", sans-serif;
    }

    .card {
        width: 24rem;
        height: 36rem;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        color: $color-primary-white;
        box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.2);

        img {
            position: absolute;
            object-fit: cover;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0.9;
            transition: opacity 0.2s ease-out;
        }

        h2 {
            position: absolute;
            inset: auto auto 30px 30px;
            margin: 0;
            transition: inset 0.3s 0.3s ease-out;
            font-family: "Roboto Condensed", sans-serif;
            font-weight: normal;
            text-transform: uppercase;
        }

        p,
        a {
            position: absolute;
            opacity: 0;
            max-width: 80%;
            transition: opacity 0.3s ease-out;
        }

        p {
            inset: auto auto 80px 30px;
        }

        a {
            inset: auto auto 40px 30px;
            color: inherit;
            text-decoration: none;
        }

        &:hover h2 {
            inset: auto auto 250px 30px;
            transition: inset 0.3s ease-out;
        }

        &:hover p,
        &:hover a {
            opacity: 1;
            transition: opacity 0.5s 0.1s ease-in;
        }

        &:hover img {
            transition: opacity 0.3s ease-in;
            opacity: 1;
        }
    }

    .material-symbols-outlined {
        vertical-align: middle;
    }
</style>
