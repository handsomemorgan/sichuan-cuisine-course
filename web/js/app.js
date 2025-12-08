import { createApp, ref, computed, onMounted, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { recipes, creativeContent } from './data.js';
import { initGame } from './game.js';
import { initIllustration } from './illustration.js';

const app = createApp({
    setup() {
        const currentView = ref('home');
        const selectedRecipe = ref(null);
        const searchQuery = ref('');
        const favorites = ref([]);
        const comments = ref([]);
        const newCommentText = ref('');
        const isSubmittingComment = ref(false);

        // Load favorites from local storage
        onMounted(() => {
            try {
                const saved = localStorage.getItem('chuan_favorites');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed)) {
                        favorites.value = parsed;
                    } else {
                        favorites.value = [];
                    }
                } else {
                    favorites.value = [];
                }
            } catch (e) {
                console.error('Error loading favorites:', e);
                favorites.value = [];
            }
            animateHero();
        });

        const filteredRecipes = computed(() => {
            if (!searchQuery.value) return recipes;
            return recipes.filter(r => r.title.includes(searchQuery.value) || r.tags.includes(searchQuery.value));
        });

        const toggleFavorite = (recipeId) => {
            const index = favorites.value.indexOf(recipeId);
            if (index === -1) {
                favorites.value.push(recipeId);
            } else {
                favorites.value.splice(index, 1);
            }
            localStorage.setItem('chuan_favorites', JSON.stringify(favorites.value));
        };

        const isFavorite = (recipeId) => favorites.value.includes(recipeId);

        const fetchComments = async (recipeId) => {
            try {
                const response = await fetch(`/api/comments?recipeId=${recipeId}`);
                if (response.ok) {
                    comments.value = await response.json();
                } else {
                    comments.value = [];
                }
            } catch (e) {
                console.error("Failed to fetch comments", e);
                comments.value = [];
            }
        };

        const postComment = async () => {
            if (!newCommentText.value.trim()) return;
            if (!selectedRecipe.value) return;

            isSubmittingComment.value = true;
            try {
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        recipeId: selectedRecipe.value.id,
                        content: newCommentText.value,
                        user: '美食爱好者', 
                        avatar_color: `hsl(${Math.random() * 360}, 70%, 50%)`
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    comments.value.unshift(result.comment);
                    newCommentText.value = '';
                }
            } catch (e) {
                console.error("Failed to post comment", e);
                alert("评论发布失败，请稍后重试");
            } finally {
                isSubmittingComment.value = false;
            }
        };

        const viewRecipe = (recipe) => {
            selectedRecipe.value = recipe;
            currentView.value = 'recipe-detail';
            comments.value = [];
            fetchComments(recipe.id);
            nextTick(() => {
                window.scrollTo(0, 0);
                animateRecipeDetail();
            });
        };

        const viewCreative = (item) => {
            currentView.value = item.id; // 'illustration' or 'game'
            nextTick(() => {
                window.scrollTo(0, 0);
                if (item.id === 'game') {
                    initGame('game-container');
                } else if (item.id === 'illustration') {
                    initIllustration('illustration-container');
                }
            });
        };

        const goHome = () => {
            currentView.value = 'home';
            selectedRecipe.value = null;
            nextTick(() => {
                animateHero();
            });
        };

        // Animations
        const animateHero = () => {
            if (typeof gsap !== 'undefined') {
                gsap.from(".hero-text", { duration: 1.5, y: 100, opacity: 0, ease: "power4.out", stagger: 0.2 });
                gsap.from(".hero-image", { duration: 2, scale: 0.8, opacity: 0, ease: "elastic.out(1, 0.3)", delay: 0.5 });
                
                // Floating ingredients effect
                gsap.to(".floating-item", {
                    y: "20px",
                    rotation: 10,
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    stagger: {
                        each: 0.5,
                        from: "random"
                    }
                });
            }
        };

        const animateRecipeDetail = () => {
             if (typeof gsap !== 'undefined') {
                gsap.from(".recipe-header", { duration: 1, opacity: 0, y: 50 });
                gsap.from(".step-card", { 
                    duration: 0.8, 
                    opacity: 0, 
                    x: -50, 
                    stagger: 0.2, 
                    scrollTrigger: {
                        trigger: ".steps-container",
                        start: "top 80%"
                    }
                });
             }
        };

        return {
            currentView,
            recipes,
            filteredRecipes,
            selectedRecipe,
            creativeContent,
            searchQuery,
            toggleFavorite,
            isFavorite,
            viewRecipe,
            viewCreative,
            goHome,
            comments,
            newCommentText,
            postComment,
            isSubmittingComment
        };
    }
});

app.mount('#app');
