import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";


const OFFICE_ADDRESS = [
  {
    label: "Korea Head Office",
    address: "126-13, Sandangupyeong-gil, Nangsan-myeon, Iksan City, Jeollabuk-do, 54524, Korea"
  },
  {
    label: "China Factory",
    address: "QINGDAO HAIJOO ART CRAFTS CO., LTD Room 101, 201, Building A, 779 Xifu Road, Chengyang District, Qingdao, Shandong, China P.C 266106"
  }
]

const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className="px-[20px] flex flex-col text-sm gap-2 mt-10 py-10 border-t-2 border-gray-400">
      <ul className="flex flex-col gap-1 md:flex-row">
        {OFFICE_ADDRESS.map((office) => {
          return (<li className="flex-1" key={office.label}>
            <h2 className="font-bold">{office.label}</h2>
            <address className="not-italic">{office.address}</address>
          </li>)
        })}
      </ul>
      <div itemScope itemType="http://schema.org/Person" className="flex justify-between items-center">
        <p>
          <span className="font-bold" itemProp="name" >Jay Bang</span><br />
          <span itemProp="jobTitle">Sales Manager</span><br />
          Email: <a href="mailto:bjaeh321@hijewel.co.kr" itemProp="email">bjaeh321@hijewel.co.kr</a><br />
          Whatsapp: <span itemProp="whatsapp">+82 10 9201 5538</span><br />
          Tell: <span itemProp="telephone">+82 63 722 0511</span><br />
          Fax: <span itemProp="faxNumber">+82 63 722 0512</span>
        </p>
        <Button onClick={() => {
          navigate(`/admin`,)
        }}>Admin</Button>
      </div>

    </footer>
  )
}

export default Footer