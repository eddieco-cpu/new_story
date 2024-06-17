import Carousel from '@components/Try/Carousel';
import Group from '@components/Try/Group'
import Dialog from '@components/Try/Dialog'

export default function Home() {
  return (
    <section>
      <section>
        <div>
          <Carousel></Carousel>
        </div>
        <div>
          <Group></Group>
          <Dialog></Dialog>
        </div>
      </section>
    </section>
  );
}
