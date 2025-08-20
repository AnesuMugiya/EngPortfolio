export default function ContactForm() {
  return (
      
<section id="contact">
<div class="min-h-screen flex items-center justify-center p-8 text-white">
  <div class="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
    

    <div class="flex flex-col justify-center">
      <h1 class="text-5xl font-extrabold leading-tight">
        Let’s get <br /> started.
      </h1>
      <p class="mt-4 text-sm font-medium tracking-widest text-gray-400 uppercase">
        Contact Form
      </p>
    </div>

    <form class="p-8">
      <div class="flex flex-wrap items-baseline gap-2 text-lg leading-relaxed">
        
        <span className="text-3xl font-bold">My name is</span>
        <div class="min-w-[160px] flex-1">
          <input type="text" placeholder="JOHN SMITH" 
                 class="w-full px-2 py-1 font-medium border-b-2 rounded-none border-gray-600 focus:border-white outline-none placeholder-gray-500 bg-transparent"/>
        </div>

        <span className="text-3xl font-bold">and I have a</span>
        <div class="min-w-[200px] flex-1">
          <input type="text" placeholder="WEBSITE OR APP DESIGN OR ETC" 
                 class="w-full px-2 py-1 font-medium border-b-2 rounded-none border-gray-600 focus:border-white outline-none placeholder-gray-500 bg-transparent"/>
        </div>

        <span className="text-3xl font-bold">that needs help. You can reach me at</span>
        <div class="min-w-[220px] flex-1">
          <input type="email" placeholder="YOUR EMAIL ADDRESS" 
                 class="w-full px-2 py-1 font-medium border-b-2 rounded-none border-gray-600 focus:border-white outline-none placeholder-gray-500 bg-transparent"/>
        </div>

        <span className="text-3xl font-bold">to get things started.</span>
      </div>

      <div class="mt-8">
        <button type="submit" 
                class="px-6 py-3 bg-white text-black font-semibold tracking-widest rounded-md hover:bg-gray-200 transition">
          — SEND INFO
        </button>
      </div>
    </form>

  </div>
</div>
</section>
  );
}
