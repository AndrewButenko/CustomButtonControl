import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button';
import { Stack } from "office-ui-fabric-react/lib/components/Stack";

export interface ICustomButtonProps{
	label: string;
	clickHandler: () => void;
}

export class CustomButton extends React.Component<ICustomButtonProps, {}> {
	render(){
		return (<>
			<Stack>
                <PrimaryButton 
                    text={this.props.label}
                    onClick={this.props.clickHandler}
                />
			</Stack>
			</>);
	}	
}