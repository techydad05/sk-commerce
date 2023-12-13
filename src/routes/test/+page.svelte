<script>
  import PocketBase from 'pocketbase';
  import { onMount } from 'svelte';

  // for server: npm install eventsource --save
  // import EventSource from '$utils/eventsource.min.js';
  
  // global.EventSource = EventSource;
  const pb = new PocketBase('http://192.168.1.42:5174');

  onMount(async () => {
    // list and filter "example" collection records
    const result = await pb
      .collection('example')
      .getList()
      .then((res) => console.log(res));

    // authenticate as auth collection record
    // const userData = await pb.collection('users').authWithPassword('test@example.com', '123456');

    // or as super-admin
    // const adminData = await pb.admins.authWithPassword('test@example.com', '123456');
  });
</script>
