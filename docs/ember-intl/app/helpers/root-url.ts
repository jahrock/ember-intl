import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';

interface RootUrlSignature {
  Args: {
    Positional: [relativeURL: string];
  };
  Return: string;
}

export default class RootUrlHelper extends Helper<RootUrlSignature> {
  compute(positional: RootUrlSignature['Args']['Positional']) {
    const [relativeURL] = positional;

    // @ts-expect-error: Property 'resolveRegistration' does not exist on type 'Owner'.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const ENV = getOwner(this).resolveRegistration(
      'config:environment',
    ) as unknown as {
      rootURL: string;
    };

    return `${ENV.rootURL}${relativeURL.replace(/^\//, '')}`;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'root-url': typeof RootUrlHelper;
  }
}
