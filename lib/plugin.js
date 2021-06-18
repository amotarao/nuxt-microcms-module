import { createClient } from 'microcms-js-sdk';

export default function (context, inject) {
  const client = createClient(<%= serialize(options.client) %>);

  const microcms = {
    client,
  };

  inject('microcms', microcms);
  context.$microcms = microcms;
}
