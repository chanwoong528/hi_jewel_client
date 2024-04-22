import "./footer.module.scss"


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
  return (
    <footer className="px-[20px]">
      <ul>
        {OFFICE_ADDRESS.map((office) => {
          return (<li key={office.label}>
            <h2>{office.label}</h2>
            <address>{office.address}</address>
          </li>)
        })}
      </ul>
      <div itemScope itemType="http://schema.org/Person">
        <p>
          <span itemProp="name">Jay Bang</span><br />
          <span itemProp="jobTitle">Sales Manager</span><br />
          Email: <a href="mailto:bjaeh321@hijewel.co.kr" itemProp="email">bjaeh321@hijewel.co.kr</a><br />
          Whatsapp: <span itemProp="whatsapp">+82 10 9201 5538</span><br />
          Tell: <span itemProp="telephone">+82 63 722 0511</span><br />
          Fax: <span itemProp="faxNumber">+82 63 722 0512</span>
        </p>
      </div>

    </footer>
  )
}

export default Footer