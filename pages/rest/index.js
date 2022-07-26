
import React from "react";
import dynamic from 'next/dynamic'
import "swagger-ui-react/swagger-ui.css";
import { Config } from '../../config/Config.js'; 

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

export default function Rest() {

    return (
        <div className="Rest">
            <SwaggerUI
                url={Config["api_url"]+'/swagger.json'}
                deepLinking={true}
                displayOperationId={true}
                filter={true}
            />
        </div>
    )
}
