package com.cuillgln.mx;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import com.cuillgln.mx.entity.audiobroadcasting.AudioBroadcastingStation;
import com.cuillgln.mx.repository.audiobroadcasting.AudioBroadcastingStationRepository;

@EnableJpaRepositories(basePackageClasses = AudioBroadcastingStationRepository.class, entityManagerFactoryRef = "rantgbEntityManagerFactory")
@Configuration
public class AudioBroadcastingConfiguration {

	@Bean
	@ConfigurationProperties("mx.datasource.rantgb")
	public DataSource rantgbDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean rantgbEntityManagerFactory(EntityManagerFactoryBuilder builder) {
		return builder.dataSource(rantgbDataSource()).packages(AudioBroadcastingStation.class)
				.persistenceUnit("rantgbUnit").build();
	}
}
