import Design from './Design'
import BackView from './BackView'

const BackCardWrapper = () => {
  return (
    <div>
        <Design child={<BackView />} />
    </div>
  )
}

export default BackCardWrapper